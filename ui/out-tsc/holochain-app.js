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
        this.currentPage = "HomeScreen";
    }
    async firstUpdated() {
        this.appWebsocket = await AppWebsocket.connect(`ws://localhost:${process.env.HC_PORT}`);
        this.appInfo = await this.appWebsocket.appInfo({
            installed_app_id: 'hDAO',
        });
        this.loading = false;
    }
    renderContent() {
        if (this.currentPage == "CreateProposal") {
            return html `
            <div style="display: flex; flex-direction: column; width: 100%;">
        <create-proposal-page></create-proposal-page>
      </div>
      `;
        }
        else if (this.currentPage == "AllProposals") {
            return html `<all-proposals></all-proposals>`;
        }
        else {
            return html `
      <body>
        <nav class="navMenu">
          <a @click=${() => { this.currentPage = "AllProposals"; }}>All Proposals</a>
          <a @click=${() => { this.currentPage = "CreateProposal"; }}>Create Proposal</a>
        </nav>
      </body>`;
        }
    }
    render() {
        if (this.loading)
            return html `
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      `;
        else {
            return html `
        <main style="width: 100%;">
          <div class="title-bar">
            <h1 style = Styles.blue-button @click=${() => { this.currentPage = "HomeScreen"; }}>hDAO</h1>
          </div>
          ${this.renderContent()}
        </main>
      `;
        }
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
      margin: 0 auto;
      text-align: center;
      background-color: black;
    }

    @font-face {
      font-family: Montserrat;
      src: url(dnas/dao/assets/Montserrat/static/Montserrat-Black.ttf) format("truetype");
      color: white;
    }

    main {
      flex-grow: 1;
      background: #050505;

    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    .button {
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }
    * {
      margin: 0;
      padding: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    body {
      background: #020202;
      font-family: "Montserrat";
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
__decorate([
    property()
], HolochainApp.prototype, "currentPage", void 0);
HolochainApp = __decorate([
    customElement('holochain-app')
], HolochainApp);
export { HolochainApp };
//# sourceMappingURL=holochain-app.js.map