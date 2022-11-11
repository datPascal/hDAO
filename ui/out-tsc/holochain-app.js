import { __decorate } from "tslib";
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AppWebsocket, } from '@holochain/client';
import { contextProvider } from '@lit-labs/context';
import '@material/mwc-circular-progress';
import { appWebsocketContext, appInfoContext } from './contexts';
import './dao/one_vote_per_user_dao/create-proposal-page';
import './dao/one_vote_per_user_dao/all-proposals';
var PageView;
(function (PageView) {
    PageView[PageView["AllProposals"] = 0] = "AllProposals";
    PageView[PageView["CreateProposal"] = 1] = "CreateProposal";
})(PageView || (PageView = {}));
let HolochainApp = class HolochainApp extends LitElement {
    constructor() {
        super(...arguments);
        this.loading = true;
        this.pageView = PageView.CreateProposal;
    }
    async firstUpdated() {
        this.appWebsocket = await AppWebsocket.connect(`ws://localhost:${process.env.HC_PORT}`);
        this.appInfo = await this.appWebsocket.appInfo({
            installed_app_id: 'hDAO',
        });
        this.loading = false;
    }
    renderContent() {
        if (this.pageView == PageView.CreateProposal) {
            return html `
            <div style="display: flex; flex-direction: column; width: 50%;">
        <create-proposal-page @create-proposal=${() => this.pageView = PageView.CreateProposal}></create-proposal-page>
      </div>
      `;
        }
        else if (this.pageView == PageView.AllProposals) {
            return html `<all-proposals></all-proposals>`;
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
        <body>
          <nav class="navMenu">
            <a href='/home/datpascal/Holo/hDAO/ui/src/dao/one_vote_per_user_dao/all-proposals.ts'>All Proposals</a>
            <a href="./out-tsc/dao/one_vote_per_user_dao/create-proposal-page.ts">Create Proposal</a>
          </nav>
        </body>
        <div class="title-bar">
          <h1>hDAO</h1>
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
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lit-element-background-color);
    }

    @font-face {
      font-family: Montserrat;
      src: url(dnas/dao/assets/Montserrat/static/Montserrat-Black.ttf) format("truetype");
    }

    main {
      flex-grow: 1;
    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    .title-bar {
      border: 2px solid #183E29;
      background: #fdd9bf;
      font-family: 'Space Mono';
      margin: 10px 70px;
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
      background: #272727;
      font-family: "Montserrat";
    }

    .navMenu {
      position: absolute;
      top: 80%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }

    .navMenu a {
      color: #000000;
      text-decoration: none;
      font-size: 1.2em;
      text-transform: uppercase;
      font-weight: 500;
      display: inline-block;
      width: 400px;
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
    }

    .navMenu a:hover {
      color: #fddb3a;
    }

    .navMenu a:nth-child(1):hover ~ .dot {
      -webkit-transform: translateX(30px);
      transform: translateX(30px);
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      opacity: 1;
    }

    .navMenu a:nth-child(2):hover ~ .dot {
      -webkit-transform: translateX(110px);
      transform: translateX(120px);
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      opacity: 1;
    }

    .navMenu a:nth-child(3):hover ~ .dot {
      -webkit-transform: translateX(200px);
      transform: translateX(200px);
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      opacity: 1;
    }

    .navMenu a:nth-child(4):hover ~ .dot {
      -webkit-transform: translateX(285px);
      transform: translateX(285px);
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      opacity: 1;
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
    state()
], HolochainApp.prototype, "pageView", void 0);
HolochainApp = __decorate([
    customElement('holochain-app')
], HolochainApp);
export { HolochainApp };
//# sourceMappingURL=holochain-app.js.map