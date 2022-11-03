use hdk::prelude::*;
use one_vote_per_user_dao_integrity::*;
#[hdk_extern]
pub fn create_proposal_vote(proposal_vote: ProposalVote) -> ExternResult<Record> {
    let proposal_vote_hash = create_entry(
        &EntryTypes::ProposalVote(proposal_vote.clone()),
    )?;
    create_link(
        proposal_vote.proposal_page_hash.clone(),
        proposal_vote_hash.clone(),
        LinkTypes::ProposalPageToProposalVote,
        (),
    )?;
    let record = get(proposal_vote_hash.clone(), GetOptions::default())?
        .ok_or(
            wasm_error!(
                WasmErrorInner::Guest(String::from("Could not find the newly created ProposalVote"))
            ),
        )?;
    let my_agent_pub_key = agent_info()?.agent_latest_pubkey;
    create_link(
        my_agent_pub_key,
        proposal_vote_hash.clone(),
        LinkTypes::AllProposalsVotedByUser,
        (),
    )?;
    Ok(record)
}
#[hdk_extern]
pub fn get_proposal_vote(action_hash: ActionHash) -> ExternResult<Option<Record>> {
    get(action_hash, GetOptions::default())
}
#[hdk_extern]
pub fn get_proposal_vote_for_proposal_page(
    proposal_page_hash: ActionHash,
) -> ExternResult<Vec<Record>> {
    let links = get_links(
        proposal_page_hash,
        LinkTypes::ProposalPageToProposalVote,
        None,
    )?;
    let get_input: Vec<GetInput> = links
        .into_iter()
        .map(|link| GetInput::new(
            ActionHash::from(link.target).into(),
            GetOptions::default(),
        ))
        .collect();
    let maybe_records = HDK.with(|hdk| hdk.borrow().get(get_input))?;
    let record: Vec<Record> = maybe_records.into_iter().filter_map(|r| r).collect();
    Ok(record)
}
