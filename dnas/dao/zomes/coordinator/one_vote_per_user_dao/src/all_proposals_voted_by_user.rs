use hdk::prelude::*;
use one_vote_per_user_dao_integrity::*;
#[hdk_extern]
pub fn get_all_proposals_voted_by_user(
    author: AgentPubKey,
) -> ExternResult<Vec<Record>> {
    let links = get_links(author, LinkTypes::AllProposalsVotedByUser, None)?;
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
