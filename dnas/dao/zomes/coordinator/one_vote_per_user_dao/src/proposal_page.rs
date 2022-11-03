use hdk::prelude::*;
use one_vote_per_user_dao_integrity::*;
#[hdk_extern]
pub fn create_proposal_page(proposal_page: ProposalPage) -> ExternResult<Record> {
    let proposal_page_hash = create_entry(
        &EntryTypes::ProposalPage(proposal_page.clone()),
    )?;
    let record = get(proposal_page_hash.clone(), GetOptions::default())?
        .ok_or(
            wasm_error!(
                WasmErrorInner::Guest(String::from("Could not find the newly created ProposalPage"))
            ),
        )?;
    let path = Path::from("all_proposals");
    create_link(
        path.path_entry_hash()?,
        proposal_page_hash.clone(),
        LinkTypes::AllProposals,
        (),
    )?;
    let my_agent_pub_key = agent_info()?.agent_latest_pubkey;
    create_link(
        my_agent_pub_key,
        proposal_page_hash.clone(),
        LinkTypes::AllProposalsCreatedByUser,
        (),
    )?;
    Ok(record)
}
#[hdk_extern]
pub fn get_proposal_page(action_hash: ActionHash) -> ExternResult<Option<Record>> {
    get(action_hash, GetOptions::default())
}
