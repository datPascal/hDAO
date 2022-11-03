pub mod all_proposals_created_by_user;
pub mod all_proposals_voted_by_user;
pub mod proposal_vote;
pub mod all_proposals;
pub mod proposal_page;
use hdk::prelude::*;
#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
    Ok(InitCallbackResult::Pass)
}
