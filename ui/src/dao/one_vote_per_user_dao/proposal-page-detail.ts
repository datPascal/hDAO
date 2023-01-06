import { LitElement, css ,html } from 'lit';
import { state, customElement, property } from 'lit/decorators.js';
import { InstalledCell, AppWebsocket, Record, ActionHash, InstalledAppInfo } from '@holochain/client';
import { contextProvided } from '@lit-labs/context';
import { decode } from '@msgpack/msgpack';
import { appInfoContext, appWebsocketContext } from '../../contexts';
import { ProposalPage } from './proposal-page';
import '@material/mwc-circular-progress';

@customElement('proposal-page-detail')
export class ProposalPageDetail extends LitElement {
  @property()
  actionHash!: ActionHash;

  @state()
  _proposalPage: ProposalPage | undefined;

  @contextProvided({ context: appWebsocketContext })
  appWebsocket!: AppWebsocket;
  @contextProvided({ context: appInfoContext })
  appInfo!: InstalledAppInfo;

  async firstUpdated() {
    const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'dao')!;
    const record: Record | undefined = await this.appWebsocket.callZome({
      cap_secret: null,
      cell_id: cellData.cell_id,
      zome_name: 'one_vote_per_user_dao',
      fn_name: 'get_proposal_page',
      payload: this.actionHash,
      provenance: cellData.cell_id[1]
    });
    if (record) {
      this._proposalPage = decode((record.entry as any).Present.entry) as ProposalPage;
    }
  }

  render() {
    if (!this._proposalPage) {
      return html`<div style="display: flex; flex: 1; align-items: center; justify-content: center">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
    }
    return html`
      <div class="Proposalbox">
      <div class= "even-columns">
        <div>
          <div class="ProposalboxesInner">
            <span><strong></strong></span>
            <span class="Proposaltitle">${ this._proposalPage.title }</span>
          </div>
          <div class="ProposalboxesInner">
            <span><strong></strong></span>
            <span class="Proposalcontent">${ this._proposalPage.content }</span>
          </div>
        </div>
        <div class= "ProposalboxesInner">
          <div class="author-container">
            <img src="author-profile-picture.jpg" alt="Author's Profile Picture" class="author-picture">
            <h3 class="author-name">Author's Name</h3>
            <p class="author-role">Author's Role</p>
          </div>

          <span class="voting-area">
            <div class="chart">
              <div class="yes">
              </div>
              <div class="no">
              </div>
            </div>
            <div class="voting-grid">
              <a href="#" class="green-button">Yes</a>
              <a href="#" class="red-button">No</a>
            </div>
          </span>
        </div>
      </div>
      </div>
    `;
  }

  static styles = css`
    .Proposalbox {
      flex-direction: column;
      flex: 0 0 auto;
      width: 800px;
      max-height; 1200;
      display: flex;
      padding: var(2rem);
      z-index: 1;
      box-shadow: 0 8px 26px -4px hsla(0,0%,8%,.15),0 8px 9px -5px hsla(0,0%,8%,.06)!important;
      margin-top: var(2rem);
      align-items: flex-start;
      border-radius: var(2rem);
      flex-direction: column;
      backdrop-filter: saturate(200%) blur(30px);
      overflow-wrap: break-word;
      background-color: #d3d0d0;
      border-radius: 25px;
    }
    .ProposalboxesInner {
      display: flex; 
      flex-direction: column;
      border-width: 2;
      border-color: black;
    }
    .Proposaltitle {
      padding-left: 1rem;
      padding-top: 1rem;
      white-space: pre-line;
      padding-bottom: 1rem;
      width: 550px;
      font-size: 25px;
      overflow-wrap: break-word;
      max-width: 100%;
      text-overflow: ellipsis;
      color: black;
      align-self: content;
    }
    .Proposalcontent {
      padding-left: 1rem;
      white-space: pre-line;
      overflow-wrap: break-word;
      max-width: 100%;
      text-overflow: ellipsis;
      width: 550px;
      color: black;
      padding-bottom: 1rem;
      align-self: content;
    }
    .voting-area {
      padding-left: 1rem;
      white-space: pre-line;
      overflow-wrap: break-word;
      max-width: 100%;
      text-overflow: ellipsis;
      width: 200px;
      color: black;
      padding-bottom: 1rem;
      padding-right: 1rem;
      align-self: voting;
    }
    .even-columns{
      display: grid;
      grid-template-areas:
        "content voting";
      grid-template-columns: 3fr 1fr;
      grid-template-rows: auto;
      gap: 1fr;
    }
    .voting-grid{
      display: grid;
      grid-template-areas:
        "Yes No";
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      gap: 1fr 1fr;
    }
    .green-button {
      background-color: green;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 4px;
      margin: auto; /* this will center the button within the container */
    }
    .green-button:hover {
      background-color: darkgreen;
      color: white;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .red-button {
      background-color: red;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 4px;
      margin: auto; /* this will center the button within the container */
    }
    .red-button:hover {
      background-color: darkred;
      color: white;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .author-container {
      padding-left: 1rem;
      align-items: center;
      margin: 16px 0;
    }

    .author-picture {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-right: 16px;
    }

    .author-name {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }

    .author-role {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
    .chart {
      display: flex; /* Make the chart a flex container */
      width: auto; /* Set the width of the chart */
      height: 30px; /* Set the height of the chart */
      border: 1px solid #333; /* Add a border to the chart */
    }
    
    /* Style the yes bar */
    .yes {
      background-color: green; /* Set the background color to green */
      width: 50%; /* Set the width of the bar to 50% */
      height: 100%; /* Make the bar the full height of the chart */
      text-align: center; /* Center the text inside the bar */
      line-height: 30px; /* Vertically center the text */
      color: white; /* Set the text color to white */500px
    }
    
    /* Style the no bar */
    .no {
      background-color: red; /* Set the background color to red */
      width: 50%; /* Set the width of the bar to 50% */
      height: 100%; /* Make the bar the full height of the chart */
      text-align: center; /* Center the text inside the bar */
      line-height: 30px; /* Vertically center the text */
      color: white; /* Set the text color to white */
    }
  `;
}
