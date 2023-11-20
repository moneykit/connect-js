# MoneyKit Connect

JavaScript SDK for connecting to a financial institution via MoneyKit Connect in a web browser.

## Usage

- Add `@moneykit/connect` to your project's dependencies.

```sh
npm install @moneykit/connect
```

To use MoneyKit Connect you must first [create a Link Session](https://docs.moneykit.com/link-session/create-link-session) via the MoneyKit API to acquire a Link Session Token.

Once you have a Link Session Token, create your MoneyKit Connect instance:

```js
import MoneyKit from "@moneykit/connect";
const linkSessionToken = "get-from-moneykit-api"; // https://docs.moneykit.com/link-session/create-link-session

const moneykit = new MoneyKit();
```

You may then launch the MoneyKit Connect flow by calling `link()` with your link session token. This will open a popup window to MoneyKit Connect in which the user may select and log into their financial institution, select their accounts and grant permissions.

To support institutions that use OAuth login it is required that you also provide a `redirect_uri` when creating your Link Session. This URI should point to a page within your app which re-initializes MoneyKit Connect via its `continue()` method. This method requires the URL that was redirected to as its first parameter (the URL should include any query parameters appended by MoneyKit during the redirect).

Both the `link` and `continue` methods accept the same three optional callback parameters which you should use to handle the results of the link process:

- `onLinkSuccess`: called when the linking process completes successfully. This callback will be passed two parameters: an exchangeable MoneyKit API token (see [Link Token Exchange](#link-token-exchange) below) and the Institution which was linked. The linked institution also includes a subset of data from financial accounts linked by the user including account type, name and mask.
- `onLinkExit`: called whenever the link process is exited manually by the user. Receives no parameters at this time.
- `onLinkEvent`: called whenever various events occur at different stages of the linking process, as indicated by the Event object parameter. Can be used to tailor or notify your application as a user progresses through a link.

### Example

```js
// Present Connect to the user
moneykit.link(linkSessionToken, (exchangeableToken, institution) => {
  console.log(exchangeableToken, institution);
});

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

## Link Token Exchange

To finalize the connection and acquire a link ID with which to make subsequent API requests, you must pass your exchangeable token received upon completion of a user's connection to your secure backend service. It should then [exchange](https://docs.moneykit.com/link-session/exchange-token) the token for a link ID via the MoneyKit API.
