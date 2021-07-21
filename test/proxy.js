require("regenerator-runtime/runtime");
const suite = require("../node_modules/token-test-suite/lib/suite");
const { expect } = require("chai");
const { BN, time, expectEvent } = require("@openzeppelin/test-helpers");
const Proxy = artifacts.require("Proxy");
const ERC20 = artifacts.require("ERC20");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Proxy", function (accounts) {
  const [alice, bob] = accounts;
  let proxy;
  let erc20;

  beforeEach(async function () {
    proxy = await Proxy.new();
    erc20 = await ERC20.at(proxy.address);
  });

  context("delegate", function () {
    let options = {
      // accounts to test with, accounts[0] being the contract owner
      accounts: accounts,

      // factory method to create new token contract
      create: async function () {
        return erc20;
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

  context("upgrade", function () {
    it("should manually upgrade token and clear previous session data", async function () {
      await erc20.transfer(bob, "1000");
      expect(await erc20.balanceOf(bob)).to.be.bignumber.equal(new BN(1000));
      const result = await proxy.upgrade();
      expect(result.receipt.status).to.be.equal(true);
      expectEvent(result.receipt, "NewSessionStarted", {});
      expect((await erc20.balanceOf(bob)).isZero()).to.be.equal(true);
    });

    it("should automatically upgrade token every 30 days", async function () {
      await erc20.transfer(bob, "1000");
      expect(await erc20.balanceOf(bob)).to.be.bignumber.equal(new BN(1000));

      const timestamp = Math.floor(Date.now() / 1000);
      expect((await proxy.sessionEndTime()).toNumber()).to.be.greaterThanOrEqual(timestamp + 3600 * 24 * 29);

      // time travelling
      await time.increase(time.duration.days(31));

      expect((await erc20.balanceOf(bob)).isZero()).to.be.equal(true);
    });
  });
});
