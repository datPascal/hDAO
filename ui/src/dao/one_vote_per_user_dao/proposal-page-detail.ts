import { LitElement, html } from 'lit';
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
      <div style="display: flex; flex-direction: column">
        <span style="font-size: 18px">ProposalPage</span>
        <div style="display: flex; flex-direction: column">
		      <span><strong></strong></span>
		      <span style="white-space: pre-line">${this._proposalPage.title }</span>
		    </div>
		    <div style="display: flex; flex-direction: column">
		      <span><strong></strong></span>
		      <span style="white-space: pre-line">${ this._proposalPage.content }</span>
		    </div>
      </div>
    `;
  }
}
