
import test from 'node:test';
import assert from 'node:assert';

import { runScenario, pause } from '@holochain/tryorama';
import { ActionHash, Record } from '@holochain/client';
import { decode } from '@msgpack/msgpack';


test('create proposal_vote', async t => {
  await runScenario(async scenario => {

    // Construct proper paths for your app.
    // This assumes app bundle created by the `hc app pack` command.
    const testAppPath = process.cwd() + '/' + "../workdir/hDAO.happ";

    // Set up the array of DNAs to be installed, which only consists of the
    // test DNA referenced by path.
    const app = { appBundleSource: { path: testAppPath } };

    // Add 2 players with the test DNA to the Scenario. The returned players
    // can be destructured.
    const [alice, bob] = await scenario.addPlayersWithHappBundles([app, app]);

    // Shortcut peer discovery through gossip and register all agents in every
    // conductor of the scenario.
    await scenario.shareAllAgents();
    
    const alice_dao_cell = alice.cells.find(c => c.role_id === 'dao');
    if (!alice_dao_cell) throw new Error("No cell for role id dao was found");

    const bob_dao_cell = bob.cells.find(c => c.role_id === 'dao');
    if (!bob_dao_cell) throw new Error("No cell for role id dao was found");
    


    const createInput = {
  proposal_page_hash: Buffer.from(new Uint8Array([132, 41, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
  vote: true
};

    // Alice creates a proposal_vote
    const record: Record = await alice_dao_cell.callZome({
      zome_name: "one_vote_per_user_dao",
      fn_name: "create_proposal_vote",
      payload: createInput,
    });
    assert.ok(record);

  });
});

test('create and read proposal_vote', async t => {
  await runScenario(async scenario => {

    // Construct proper paths for your app.
    // This assumes app bundle created by the `hc app pack` command.
    const testAppPath = process.cwd() + '/' + "../workdir/hDAO.happ";

    // Set up the array of DNAs to be installed, which only consists of the
    // test DNA referenced by path.
    const app = { appBundleSource: { path: testAppPath } };

    // Add 2 players with the test DNA to the Scenario. The returned players
    // can be destructured.
    const [alice, bob] = await scenario.addPlayersWithHappBundles([app, app]);

    // Shortcut peer discovery through gossip and register all agents in every
    // conductor of the scenario.
    await scenario.shareAllAgents();
    
    const alice_dao_cell = alice.cells.find(c => c.role_id === 'dao');
    if (!alice_dao_cell) throw new Error("No cell for role id dao was found");

    const bob_dao_cell = bob.cells.find(c => c.role_id === 'dao');
    if (!bob_dao_cell) throw new Error("No cell for role id dao was found");
    

    const createInput: any = {
  proposal_page_hash: Buffer.from(new Uint8Array([132, 41, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
  vote: true
};

    // Alice creates a proposal_vote
    const record: Record = await alice_dao_cell.callZome({
      zome_name: "one_vote_per_user_dao",
      fn_name: "create_proposal_vote",
      payload: createInput,
    });
    assert.ok(record);
    
    // Wait for the created entry to be propagated to the other node.
    await pause(300);

    // Bob gets the created proposal_vote
    const createReadOutput: Record = await bob_dao_cell.callZome({
      zome_name: "one_vote_per_user_dao",
      fn_name: "get_proposal_vote",
      payload: record.signed_action.hashed.hash,
    });
    assert.deepEqual(createInput, decode((createReadOutput.entry as any).Present.entry) as any);
  });
});