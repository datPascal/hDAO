import { __decorate } from "tslib";
import { LitElement, css, html } from 'lit';
import { state, customElement, property } from 'lit/decorators.js';
import { contextProvided } from '@lit-labs/context';
import { decode } from '@msgpack/msgpack';
import { appInfoContext, appWebsocketContext } from '../../contexts';
import '@material/mwc-circular-progress';
let ProposalPageDetail = class ProposalPageDetail extends LitElement {
    async firstUpdated() {
        const cellData = this.appInfo.cell_data.find((c) => c.role_id === 'dao');
        const record = await this.appWebsocket.callZome({
            cap_secret: null,
            cell_id: cellData.cell_id,
            zome_name: 'one_vote_per_user_dao',
            fn_name: 'get_proposal_page',
            payload: this.actionHash,
            provenance: cellData.cell_id[1]
        });
        if (record) {
            this._proposalPage = decode(record.entry.Present.entry);
        }
    }
    render() {
        if (!this._proposalPage) {
            return html `<div style="display: flex; flex: 1; align-items: center; justify-content: center">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
        }
        return html `
      <div class="Proposalbox">
      <div class= "even-columns">
        <div>
          <div class="ProposalboxesInner">
            <span><strong></strong></span>
            <span class="Proposaltitle">${this._proposalPage.title}</span>
          </div>
          <div class="ProposalboxesInner">
            <span><strong></strong></span>
            <span class="Proposalcontent">${this._proposalPage.content}</span>
          </div>
        </div>
        <div class= "ProposalboxesInner">
          <span class="voting-area">
            <div class="voting-grid">
              <a href="#" class="ButtonYes">Yes</a>
              <a href="#" class="ButtonNo">No</a>
            </div>
          </span>
        </div>
      </div>
      </div>
    `;
    }
};
ProposalPageDetail.styles = css `
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
    .ButtonYes {
      box-shadow:inset 0px 0px 15px 3px #23395e;
      background-color:#00882d;
      border-radius:17px;
      border:1px solid #0c3b00;
      display:inline-block;
      cursor:pointer;
      color:#ffffff;
      font-family:Arial;
      font-size:15px;
      padding:6px 10px;
      text-decoration:none;
      text-shadow:0px 1px 0px #263666;
      align-self: Yes;
    }
    .ButtonYes:hover {
      background:linear-gradient(to bottom, #415989 5%, #2e466e 100%);
      background-color:#064101;
    }
    .ButtonYes:active {
      position:relative;
      top:1px;
    }
    .ButtonNo {
      box-shadow:inset 0px 0px 15px 3px #23395e;
      background-color:#882000;
      border-radius:17px;
      border:1px solid #3a020e;
      display:inline-block;
      cursor:pointer;
      color:#ffffff;
      font-family:Arial;
      font-size:15px;
      padding:6px 10px;
      text-decoration:none;
      text-shadow:0px 1px 0px #263666;
      align-self: no;
    }
    .ButtonNo:hover {
      background:linear-gradient(to bottom, #415989 5%, #2e466e 100%);
      background-color:#5a0101;
    }
    .ButtonNo:active {
      position:relative;
      top:1px;
    }

  `;
__decorate([
    property()
], ProposalPageDetail.prototype, "actionHash", void 0);
__decorate([
    state()
], ProposalPageDetail.prototype, "_proposalPage", void 0);
__decorate([
    contextProvided({ context: appWebsocketContext })
], ProposalPageDetail.prototype, "appWebsocket", void 0);
__decorate([
    contextProvided({ context: appInfoContext })
], ProposalPageDetail.prototype, "appInfo", void 0);
ProposalPageDetail = __decorate([
    customElement('proposal-page-detail')
], ProposalPageDetail);
export { ProposalPageDetail };
//# sourceMappingURL=proposal-page-detail.js.map