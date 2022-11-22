import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
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
      <div style="display: flex; flex-direction: column">
        <span style="font-size: 18px">ProposalPage</span>
        <div style="display: flex; flex-direction: column">
		      <span><strong></strong></span>
		      <span style="white-space: pre-line">${this._proposalPage.title}</span>
		    </div>
		    <div style="display: flex; flex-direction: column">
		      <span><strong></strong></span>
		      <span style="white-space: pre-line">${this._proposalPage.content}</span>
		    </div>
      </div>
    `;
    }
};
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