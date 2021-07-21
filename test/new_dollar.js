require("regenerator-runtime/runtime");
const suite = require("../node_modules/token-test-suite/lib/suite");
const NewDollar = artifacts.require("NewDollar");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("NewDollar", function (accounts) {
  let options = {
    // accounts to test with, accounts[0] being the contract owner
    accounts: accounts,

    // factory method to create new token contract
    create: async function () {
      const newDollar = await NewDollar.new();
      await newDollar.initialize(accounts[0], "NewDollar", "NWD");
      return newDollar;
    },

    // factory callbacks to mint the tokens
    // use "transfer" instead of "mint" for non-mintable tokens
    transfer: async function (token, to, amount) {
      return await token.transfer(to, amount, { from: accounts[0] });
    },

    // optional:
    // also test the increaseApproval/decreaseApproval methods (not part of the ERC-20 standard)
    increaseDecreaseApproval: false,

    // token info to test
    name: "NewDollar",
    symbol: "NWD",
    decimals: 18,

    // initial state to test
    initialSupply: "1000000000000000000000000",
    initialBalances: [[accounts[0], "1000000000000000000000000"]],
    initialAllowances: [[accounts[0], accounts[1], "0"]],
  };

  suite(options);
});
