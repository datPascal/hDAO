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
import './dao/one_vote_per_user_dao/all-proposals-created-by-user';


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
            <div><all-proposals></all-proposals></div>
      `
    }
  }
  render() {
    if (this.loading)
      return html`
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      `;

    else {
      return html`
    <!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>hDAO</title>
    <meta name="description" content="hDAO Application for hApps">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="headertop">
        <a class="logo" href="#" @click=${() => {this.currentPage = "HomeScreen"}}><img src="./dao/images/hDAO-Logo" alt="logo" style="width:200px;height:75px;"/></a>
        <a class="cta" href="#" @click=${() => {this.currentPage = "CreateProposal"}}>Create Proposal</a>
        <p class="menu cta">Menu</p>
    </header>

    <div class="home-container">
      <header style="height:50px; width:100%;"></header>
      ${ this.renderContent() }
    </div>

</body>
</html>
      `;
    }
}

  static styles = css`
    * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.headertop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10%;
  background-color: #24252a;
}

.logo {
  cursor: pointer;
}
.home-container {
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  background-color: white;
}
.nav__links a,
.cta,
.overlay__content a {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  color: #edf0f1;
  text-decoration: none;
}

.nav__links {
  list-style: none;
  display: flex;
}

.nav__links li {
  padding: 0px 20px;
}

.nav__links li a {
  transition: color 0.3s ease 0s;
}

.nav__links li a:hover {
  color: #0088a9;
}

.cta {
  padding: 9px 25px;
  background-color: rgba(0, 136, 169, 1);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease 0s;
}

.cta:hover {
  background-color: rgba(0, 136, 169, 0.8);
}

/* Mobile Nav */

.menu {
  display: none;
}

.overlay {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: #24252a;
  overflow-x: hidden;
  transition: width 0.5s ease 0s;
}

.overlay--active {
  width: 100%;
}

.overlay__content {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.overlay a {
  padding: 15px;
  font-size: 36px;
  display: block;
  transition: color 0.3s ease 0s;
}

.overlay a:hover,
.overlay a:focus {
  color: #0088a9;
}
.overlay .close {
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
  color: #edf0f1;
}

@media screen and (max-height: 450px) {
  .overlay a {
    font-size: 20px;
  }
  .overlay .close {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
}

@media only screen and (max-width: 800px) {
  .nav__links,
  .cta {
    display: none;
  }
  .menu {
    display: initial;
  }
}
.Flexcontainer {
  display: flex;
  justify-content: space-between;
  --max-width: 1200px;
  --padding: 1rem;
  width: min(var(--max-width), 100% - var(--padding));
  margin-inline: auto;
}
.even-columns{
  display: grid;
  gap: 1rem;
}
@media (min-width: 50em){
  .even-columns{
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
  }
}

`;
}
