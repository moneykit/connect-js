# MoneyKit Connect

JavaScript SDK for connecting to a financial institution via MoneyKit Connect in a web browser.

## Installation

To begin using Connect simply add the `@moneykit/connect` package to your project's dependencies.

```sh
npm install @moneykit/connect
```

## Usage

To use MoneyKit Connect you must first [create a Link Session](https://docs.moneykit.com/link-session/create-link-session) via the MoneyKit API to acquire a Link Session Token.

Once you have a Link Session Token, create your MoneyKit Connect instance:

```js
import MoneyKit from "@moneykit/connect";

const moneykit = new MoneyKit();
```

Configuration options may also be provided to customize Connect's behavior. See [Configuration](#configuration) for details.

You may then launch the MoneyKit Connect flow by calling `link()` with your link session token. This will open a popup window to MoneyKit Connect in which the user may select and log into their financial institution, select their accounts and grant permissions before handing off back to your application.

---

Note that to support financial institutions that require OAuth login it is required that you also provide a `redirect_uri` when creating your Link Session. This URI should point to a page within your app which re-initializes MoneyKit Connect via its `continue()` method. This method requires the URL that was redirected to as its first parameter (the URL should include any query parameters appended by MoneyKit during the redirect).

---

The `link`, `continue` and [`relink`](#relinking) methods accept the same three optional callbacks which you may use to handle the results of the Connect flow:

- `onLinkSuccess`: called when the linking process completes successfully. This callback will be passed two parameters: an exchangeable MoneyKit API token (see [Link Token Exchange](#link-token-exchange)) and the [Institution](#linkedinstitution) which was linked. The linked institution also includes a subset of data from financial accounts linked by the user including account type, name and mask.
- `onLinkExit`: called whenever the Connect process is exited manually by the user or due to an unexpected error.
- `onLinkEvent`: called with an [`Event`](#events) object whenever certain events occur throughout the Connect flow, as indicated by the Event object parameter. These may be used to tailor or notify your application as a user progresses through a link or for analytics purposes.

### OAuth

When a user's financial institution uses OAuth for login, the user will be temporarily navigated to the institution's login page before being returned to your application.

In most cases the OAuth page will be opened as a new popup window. Upon successful authorization with the institution this window will navigate back to the `redirect_uri` you specified when creating your Link Session. (Note that on mobile browsers such as iOS Safari this window will be opened as a new tab instead of a popup.)

When you call `continue()` from your app after receiving this redirect, the OAuth window will be closed and the Connect flow will resume back in the original window.

#### Note on Webview usage

If Connect is launched inside of a mobile webview (such as one embedded within a native iOS or Android app) where it is not permitted to open a new window or tab, this will be detected by Connect and instead the topmost window in the window hierarchy will be navigated to the OAuth page. This window will then redirect back to your `redirect_uri` as normal. Calling `continue()` in this scenario will re-launch Connect and allow the user to proceed with their in-progress link.

### Example

```js
// Present Connect to the user and log the result
moneykit.link(
  linkSessionToken,
  (exchangeableToken, institution) => {
    // onLinkSuccess
    console.log("Link created successfully", exchangeableToken, institution);
  },
  (error) => {
    // onLinkExit
    console.log(
      "Connect closed without creating a link. Error will be provided if one occurred."
    );
  },
  (event) => {
    // onLinkEvent
    console.log("Link event occurred: ", JSON.stringify(event));
  }
);

/**
 * Required for OAuth institutions.
 * This will present Connect again and allow the user to continue their link
 * in progress after completing OAuth with their financial institution.
 *
 * This `continue()` call should be performed on the page you indicated
 * as your `redirect_uri` when creating a Link Session.
 * The complete URL that was redirected to should be passed as the first argument.
 */
moneykit.continue(window.location.href, (exchangeableToken, institution) => {
  console.log(exchangeableToken, institution);
});
```

### Relinking

In the event that a user's existing link has expired (e.g. due to the financial institution requiring periodic user re-authorization) your MoneyKit API requests will respond with an `auth_expired` error.

To re-authorize the user you may call `relink()` with a link session token and callbacks identical to those for the `link()` method. In this case the link session token must have been created with the `existing_link_id` field set to the ID of the link you wish to re-authorize.

Connect will be opened as normal, however the institution selection step will be bypassed and the user will be immediately prompted to log in to the institution and re-authorize the connection.

## Link Token Exchange

To finalize the connection and acquire a link ID with which to make subsequent API requests, you must pass your exchangeable token received upon completion of a user's connection to your secure backend service. It should then [exchange](https://docs.moneykit.com/link-session/exchange-token) the token for a link ID via the MoneyKit API.

## Configuration

When initializing MoneyKit Connect you may optionally provide it with an options object.

```
const moneykit = new MoneyKit({
  containerID: "moneykit-container",
});
```

Currently the following options are supported:

**`containerID`**

The ID of the DOM element to which Connect and it's overlay will be appended. If not provided, Connect will be appended to the document body by default.

## Data Types

### LinkedInstitution

A LinkedInstitution will be returned to your link success callback functions and includes the following data.

```
{
  avatar: string | null;
  avatar_dark: string | null;
  color: string;
  color_dark: string | null;
  country: string;
  domain: string;
  id: string;
  logo: string | null;
  logo_dark: string | null;
  name: string;
  selectedAccounts: {
    account_id: string;
    account_type: AccountType;
    name: string;
    account_mask: string | null;
  }[];
  trackedScreens: {
    tag: string;
    name: string;
    duration: number;
  }[]
}
```

### Events

The following event types will be sent to your `onLinkEvent` callback function if you provide one.

```
{
  name: EventType;
  properties?: Record<string, unknown>
  meta: {
    link_type: "link" | "relink";
    timestamp: string;
    link_session_id: string;
    institution_id?: string;
    institution_name?: string;
  }
}
```

The contents of `properties` will depend on the event type. `institution_id` and `institution_name` will be present only on events occurring after an Institution has been selected by the user.

**Event types:**

- `open`
  - Connect was opened
- `exit`
  - Connect was closed without a link being created
- `success`
  - Connect was closed after successfully creating a link
- `error`
  - An error occurred during the Connect flow. Details of the error will be included in the event's properties.
- `change_screen`
  - The user navigated to a new screen within Connect. The screen name will be included in the event's properties.
- `select_institution`
  - The user selected an institution. The institution ID and name will be included in the event's properties.
- `search_institution`
  - The user searched for an institution. The search query will be included in the event's properties.
- `submit_credentials`
  - The user submitted their credentials to log in to their institution.
- `open_oauth`
  - The user was directed to their institution's OAuth page.
- `submit_otp_device`
  - The user selected a device to receive an OTP.
- `submit_otp`
  - The user submitted their OTP.
- `submit_mfa`
  - The user submitted a MFA answer.
- `submit_permissions`
  - The user selected which permissions to grant.
- `submit_accounts`
  - The user selected which accounts to link.

Note that it is possible new event types not yet included here may also be sent.
