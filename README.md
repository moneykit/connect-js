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

## Link Token Exchange

To finalize the connection and acquire a long-lived access token with which to make subsequent requests, you must pass this exchangeable token to your secure backend service which should then [exchange](https://docs.moneykit.com/openapi/core/#operation/exchange_token) it via the MoneyKit API.
