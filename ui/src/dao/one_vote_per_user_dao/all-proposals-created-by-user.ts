import { LitElement, html } from 'lit';
import { state, customElement, property } from 'lit/decorators.js';
import { InstalledCell, AgentPubKey, Record, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { contextProvided } from '@lit-labs/context';
import { appWebsocketContext, appInfoContext } from '../../contexts';
import '@material/mwc-circular-progress';
import './proposal-page-detail';

@customElement('all-proposals-created-by-user')
export class AllProposalsCreatedByUser extends LitElement {

  @property()
  author!: AgentPubKey;

  @state()
  _records: Array<Record> | undefined;

  @contextProvided({ context: appWebsocketContext })
  appWebsocket!: AppWebsocket;

  @contextProvided({ context: appInfoContext })
  appInfo!: InstalledAppInfo;

  async firstUpdated() {
    const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'dao')!;

    this._records = await this.appWebsocket.callZome({
      cap_secret: null,
      cell_id: cellData.cell_id,
      zome_name: 'one_vote_per_user_dao',
      fn_name: 'get_all_proposals_created_by_user',
      payload: this.author,
      provenance: cellData.cell_id[1]
    });
  }

  render() {
    if (!this._records) {
      return html`<div style="display: flex; flex: 1; align-items: center; justify-content: center">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
    }
    return html`
      <div style="display: flex; flex-direction: column">
        ${this._records.map(r => 
          html`<proposal-page-detail .actionHash=${r.signed_action.hashed.hash} style="margin-bottom: 16px;"></proposal-page-detail>`
        )}
      </div>
    `;
  }
}
