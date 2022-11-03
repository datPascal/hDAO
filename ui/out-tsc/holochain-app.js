import { __decorate } from "tslib";
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AppWebsocket, } from '@holochain/client';
import { contextProvider } from '@lit-labs/context';
import '@material/mwc-circular-progress';
import { appWebsocketContext, appInfoContext } from './contexts';
import './dao/one_vote_per_user_dao/create-proposal-page';
import './dao/one_vote_per_user_dao/all-proposals';
let HolochainApp = class HolochainApp extends LitElement {
    constructor() {
        super(...arguments);
        this.loading = true;
    }
    async firstUpdated() {
        this.appWebsocket = await AppWebsocket.connect(`ws://localhost:${process.env.HC_PORT}`);
        this.appInfo = await this.appWebsocket.appInfo({
            installed_app_id: 'hDAO',
        });
        this.loading = false;
    }
    render() {
        if (this.loading)
            return html `
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      `;
        return html `
      <main>

        <h1>hDAO</h1>
        <h2>for everyone loving DAO'S</h2>

        <div id="content">

          <create-proposal-page> </create-proposal-page>
          <all-proposals> </all-proposals>

        </div>
      </main>
    `;
    }
};
HolochainApp.styles = css `
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lit-element-background-color);
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;
__decorate([
    state()
], HolochainApp.prototype, "loading", void 0);
__decorate([
    contextProvider({ context: appWebsocketContext }),
    property({ type: Object })
], HolochainApp.prototype, "appWebsocket", void 0);
__decorate([
    contextProvider({ context: appInfoContext }),
    property({ type: Object })
], HolochainApp.prototype, "appInfo", void 0);
HolochainApp = __decorate([
    customElement('holochain-app')
], HolochainApp);
export { HolochainApp };
//# sourceMappingURL=holochain-app.js.map