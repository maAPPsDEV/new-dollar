const NewDollar = artifacts.require("NewDollar");

module.exports = function (_deployer, _network, [_owner]) {
  // Use deployer to state migration tasks.
  _deployer.deploy(NewDollar).then(async function (newDollar) {
    await newDollar.initialize(_owner, "NewDollar", "NWD");
  });
};
