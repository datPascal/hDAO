import { __decorate } from "tslib";
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import "./dao/components/corp-button.js";
import "./dao/components/textfield.js";
import "./dao/components/navbarTop.js";
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
      `;
        }
    }
    render() {
        if (this.loading)
            return html `
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      `;
        else {
            return html `
        <div class= "banner">
        <div class= "navbartop">
            <ul>
                <li><a><corp-button @click=${() => { this.currentPage = "AllProposals"; }}>All Proposals</corp-button></a></li>
                <li><a><corp-button @click=${() => { this.currentPage = "CreateProposal"; }}>Create Proposal</corp-button></a></li>
            </ul>
        </div>
      </div>
        <main style="width: 100%;">
            <h1 @click=${() => { this.currentPage = "HomeScreen"; }}>hDAO</h1>
          ${this.renderContent()}
        </main>
      `;
        }
    }
};
HolochainApp.styles = css `
    main {
      flex-grow: 1;
      background: #fdfbfb;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(12px + 2vmin);
      color: #061831;
      margin: 0 auto;
      text-align: center;
    }
    .navbartop {
        width: 100%;
        margin: auto;
        padding: 35px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #013f1c;;
    }
    .navbartop ul li {
        list-style: none;
        display: inline-block;
        margin: 0 20px;
        font-size: calc(20px + 2vmin);
    }
    .banner {
        width: 100%;
        height: 100px;
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