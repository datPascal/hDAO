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
        <div class="ProposalboxesInner">
		      <span><strong></strong></span>
		      <span class="Proposaltitle">${this._proposalPage.title}</span>
		    </div>
		    <div class="ProposalboxesInner">
		      <span><strong></strong></span>
		      <span class="Proposalcontent">${this._proposalPage.content}</span>
		    </div>
      </div>
    `;
    }
};
ProposalPageDetail.styles = css `
    .Proposalbox {
      flex-direction: column;
      flex: 0 0 auto;
      width: 100%;
      display: flex;
      padding: var(--dl-space-space-tripleunit);
      z-index: 1;
      box-shadow: 0 8px 26px -4px hsla(0,0%,8%,.15),0 8px 9px -5px hsla(0,0%,8%,.06)!important;
      margin-top: var(--dl-space-space-tripleunit);
      align-items: flex-start;
      border-radius: var(--dl-radius-radius-radius1);
      flex-direction: column;
      backdrop-filter: saturate(200%) blur(30px);
      overflow-wrap: break-word;
    }
    .ProposalboxesInner {
      display: flex; 
      flex-direction: column;
      border-width: 2;
      border-color: black;
    }
    .Proposaltitle {
      white-space: pre-line;
      padding-bottom: 1rem;
      font-size: 20px;
      overflow-wrap: break-word;
      max-width: 100%;
    }
    .Proposalcontent {
      white-space: pre-line;
      overflow-wrap: break-word;
      max-width: 100%;
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