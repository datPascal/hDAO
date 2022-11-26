import { LitElement, css ,html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { InstalledCell, ActionHash, Record, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { contextProvided } from '@lit-labs/context';
import { appWebsocketContext, appInfoContext } from '../../contexts';
import { ProposalPage } from './proposal-page';
import '@material/mwc-button';
import '@material/mwc-textarea';
import '@material/mwc-textfield';

@customElement('create-proposal-page')
export class CreateProposalPage extends LitElement {

  @state()
  _content: string
 | undefined;

  @state()
  _title: string
 | undefined;

  isProposalPageValid() {
    return this._content && this._title;
  }

  @contextProvided({ context: appWebsocketContext })
  appWebsocket!: AppWebsocket;

  @contextProvided({ context: appInfoContext })
  appInfo!: InstalledAppInfo;

  async createProposalPage() {
    const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'dao')!;

    const proposalPage: ProposalPage = { 
      content: this._content!,

      title: this._title!,
    };

    const record: Record = await this.appWebsocket.callZome({
      cap_secret: null,
      cell_id: cellData.cell_id,
      zome_name: 'one_vote_per_user_dao',
      fn_name: 'create_proposal_page',
      payload: proposalPage,
      provenance: cellData.cell_id[1]
    });

    this.dispatchEvent(new CustomEvent('proposal-page-created', {
      composed: true,
      bubbles: true,
      detail: {
        actionHash: record.signed_action.hashed.hash
      }
    }));
  }

  render() {
    return html`
      
      <div style="display: flex; flex: 1; flex-direction: column; align-items: center;">
        <h1 style="font-family: 'Space Mono'; color: #183E29">Proposal Creation</h1>
      
        <div class="Proposalbox">
          <div class="ProposalboxesInner">
              <mwc-textfield style="width:700px;" outlined label="Proposal Title" @input=${(e: CustomEvent) => { this._title = (e.target as any).value;} }></mwc-textfield>
              <mwc-textarea style="width:700px;" outlined label="Proposal Text" @input=${(e: CustomEvent) => { this._content = (e.target as any).value; } }></mwc-textarea>

              <button @click=${this.createProposalPage}>Create Proposal</button>
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
      align-items: center;
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
      width: 700px;
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
      width: 700px;
      color: black;
      padding-bottom: 1rem;
      align-self: content;
    }
`

}
