import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import "./dao/components/corp-button.js";
import "./dao/components/textfield.js";
import "./dao/components/navbarTop.js";

import {
  AppWebsocket,
  ActionHash,
  InstalledAppInfo,
} from '@holochain/client';

import { contextProvider } from '@lit-labs/context';
import '@material/mwc-circular-progress';

import { appWebsocketContext, appInfoContext } from './contexts';
import './dao/one_vote_per_user_dao/create-proposal-page';
import './dao/one_vote_per_user_dao/all-proposals';

@customElement('holochain-app')
export class HolochainApp extends LitElement {
  @state() loading = true;

  @contextProvider({ context: appWebsocketContext })
  @property({ type: Object })
  appWebsocket!: AppWebsocket;

  @contextProvider({ context: appInfoContext })
  @property({ type: Object })
  appInfo!: InstalledAppInfo;

  @property()
  currentPage = "HomeScreen";
  
  async firstUpdated() {
    this.appWebsocket = await AppWebsocket.connect(
      `ws://localhost:${process.env.HC_PORT}`
    );

    this.appInfo = await this.appWebsocket.appInfo({
      installed_app_id: 'hDAO',
    });

    this.loading = false;
  }
  

  renderContent() {
    if (this.currentPage == "CreateProposal") {
      return html`
            <div style="display: flex; flex-direction: column; width: 100%;">
        <create-proposal-page></create-proposal-page>
      </div>
      `
    } else if (this.currentPage == "AllProposals") {
        return html`<all-proposals></all-proposals>`
    } else {
      return html`
      <body>
        <nav>
          <navbar-top>Smile</navbar-top>
          <corp-button @click=${() => {this.currentPage = "AllProposals"}}>All Proposals</corp-button>
          <corp-button @click=${() => {this.currentPage = "CreateProposal"}}>Create Proposal</corp-button>
        </nav>
      </body>`
    }
  }
  render() {
    if (this.loading)
      return html`
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      `;

    else {
      return html`
        <main style="width: 100%;">
          <div>
            <h1 @click=${() => {this.currentPage = "HomeScreen"}}>hDAO</h1>
          </div>
          ${ this.renderContent() }
        </main>
      `;
    }
}

  static styles = css`
    :host {
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
    main {
      flex-grow: 1;
      background: #fdfbfb;
    }
  `;
}
