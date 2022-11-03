import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { state, customElement, property } from 'lit/decorators.js';
import { contextProvided } from '@lit-labs/context';
import { decode } from '@msgpack/msgpack';
import { appInfoContext, appWebsocketContext } from '../../contexts';
import '@material/mwc-circular-progress';
let ProposalVoteDetail = class ProposalVoteDetail extends LitElement {
    async firstUpdated() {
        const cellData = this.appInfo.cell_data.find((c) => c.role_id === 'dao');
        const record = await this.appWebsocket.callZome({
            cap_secret: null,
            cell_id: cellData.cell_id,
            zome_name: 'one_vote_per_user_dao',
            fn_name: 'get_proposal_vote',
            payload: this.actionHash,
            provenance: cellData.cell_id[1]
        });
        if (record) {
            this._proposalVote = decode(record.entry.Present.entry);
        }
    }
    render() {
        if (!this._proposalVote) {
            return html `<div style="display: flex; flex: 1; align-items: center; justify-content: center">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
        }
        return html `
      <div style="display: flex; flex-direction: column">
        <span style="font-size: 18px">ProposalVote</span>
		  <!-- TODO: implement the rendering of proposal_page_hash -->
		  <div style="display: flex; flex-direction: row">
		    <span><strong></strong></span>
		    <span style="white-space: pre-line">${this._proposalVote.vote ? 'Yes' : 'No'}</span>
		  </div>
      </div>
    `;
    }
};
__decorate([
    property()
], ProposalVoteDetail.prototype, "actionHash", void 0);
__decorate([
    state()
], ProposalVoteDetail.prototype, "_proposalVote", void 0);
__decorate([
    contextProvided({ context: appWebsocketContext })
], ProposalVoteDetail.prototype, "appWebsocket", void 0);
__decorate([
    contextProvided({ context: appInfoContext })
], ProposalVoteDetail.prototype, "appInfo", void 0);
ProposalVoteDetail = __decorate([
    customElement('proposal-vote-detail')
], ProposalVoteDetail);
export { ProposalVoteDetail };
//# sourceMappingURL=proposal-vote-detail.js.map