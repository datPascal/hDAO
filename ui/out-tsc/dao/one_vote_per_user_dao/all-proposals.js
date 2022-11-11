import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { contextProvided } from '@lit-labs/context';
import { appWebsocketContext, appInfoContext } from '../../contexts';
import '@material/mwc-circular-progress';
import './proposal-page-detail';
let AllProposals = class AllProposals extends LitElement {
    async firstUpdated() {
        const cellData = this.appInfo.cell_data.find((c) => c.role_id === 'dao');
        this._records = await this.appWebsocket.callZome({
            cap_secret: null,
            cell_id: cellData.cell_id,
            zome_name: 'one_vote_per_user_dao',
            fn_name: 'get_all_proposals',
            payload: null,
            provenance: cellData.cell_id[1]
        });
    }
    render() {
        if (!this._records) {
            return html `<div style="display: flex; flex: 1; align-items: center; justify-content: center">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
        }
        return html `
      <div style="display: flex; flex-direction: column">
        ${this._records.map(r => html `<proposal-page-detail .actionHash=${r.signed_action.hashed.hash} style="margin-bottom: 16px;"></proposal-page-detail>`)}
      </div>
    `;
    }
};
__decorate([
    state()
], AllProposals.prototype, "_records", void 0);
__decorate([
    contextProvided({ context: appWebsocketContext })
], AllProposals.prototype, "appWebsocket", void 0);
__decorate([
    contextProvided({ context: appInfoContext })
], AllProposals.prototype, "appInfo", void 0);
AllProposals = __decorate([
    customElement('all-proposals')
], AllProposals);
export { AllProposals };
//# sourceMappingURL=all-proposals.js.map