# MoneyKit Connect

JavaScript SDK for connecting to a financial institution via MoneyKit Connect in a web browser.

## Usage

- Add `@moneykit/connect` to your project's dependencies.

```sh
npm install @moneykit/connect
```

- To use MoneyKit Connect you must first [create a Link Session](https://docs.moneykit.com/openapi/core/#operation/create_link_session) via the MoneyKit API to acquire a Link Session Token
- Once you have a Link Session Token, create your MoneyKit Connect instance

```js
import MoneyKit from "@moneykit/connect";
const linkSessionToken = "get-from-moneykit-api"; // https://docs.moneykit.com/openapi/core/#operation/create_link_session

const moneykit = new MoneyKit();
moneykit.link(linkSessionToken);
```

You may now launch the MoneyKit Connect flow by calling `link()` with your link session token. This will open a popup window to MoneyKit Connect in which the user may select and log into their financial institution, select their accounts and grant permissions.

The `link` method also accepts three optional callback parameters:

- `onLinkSuccess` - called when the linking process completes successfully. This callback will be passed two arguments: an exchangeable MoneyKit API token (see below) and the Institution which was linked. The linked institution also includes a subset of data from financial accounts linked by the user including account type, name and mask.
- `onLinkExit` - called whenever the link process is exited manually by the user. Receives no arguments at this time.
- `onLinkEvent` - called whenever various events occur at different stages of the linking process, as indicated by the Event object argument. Can be used to tailor or notify your application as a user progresses through a link.

### OAuth Flows

Many Financial Institutions require users to authorize the connection via OAuth on the institution's own website.

To support this workflow you must provide a `redirect_uri` when creating a Link Session via the MoneyKit API. This URI should go to a page of yours which can re-initialize MoneyKit Connect via its `continue()` method. This method requires the URL that was redirected to as its first argument (the URL should included all query parameters appended by MoneyKit during the redirect) followed by all of the same optional callbacks detailed for the `link()` method above.

```js
// my-redirect-page.js
import MoneyKit from "@moneykit/connect";
const moneykit = new MoneyKit();
moneykit.continue(window.location.href, (exchangeableToken, institution) => {
  console.log(exchangeableToken, institution);
});
```

## Link Token Exchange

To finalize the connection and acquire a link ID with which to make subsequent requests, you must pass your exchangeable token received upon completion of a user's connection to your secure backend service. It should then [exchange](https://docs.moneykit.com/openapi/core/#operation/exchange_token) the token for a link ID via the MoneyKit API.
