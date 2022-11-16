import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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
        <nav class="navMenu">
          <a @click=${() => {this.currentPage = "AllProposals"}}>All Proposals</a>
          <a @click=${() => {this.currentPage = "CreateProposal"}}>Create Proposal</a>
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
          <div class="title-bar">
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
    .title-bar {
      border: 2px solid #060707;
      background: #070707;
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
      background: #020202;
      font-family: "Montserrat";
    }

    .navMenu {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }

    .navMenu a {
      color: #f0e8e8;
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
}
