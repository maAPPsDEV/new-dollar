# The New Dollar

We are building a one of a kind stablecoin that the world has never seen before. This stablecoin uses a very unique pattern and is designed to incentivize people who own these coins to spend them as fast as possible to stimulate the economy. This bank is developing a stablecoin whose user balances reset anytime the bank upgrades their stablecoin smart contract. This means that if the bank has an upgrade every 30 days, you no longer own these stablecoins at the end of the month.

## Problem

Design an ERC20 compliant token where the balances reset every time you upgrade it.
If you own this stablecoin in January, and there is always a smart contract upgrade at the end of each month, then in February, you should not own those stablecoins anymore. Your token should have all ERC20 interfaces and events. You can use whatever framework or version of solidity that you would like, but you cannot use a framework for handling the creation of the proxy contracts. It would be great to have a few tests to demonstrate functionality without having to manually run through things.

## Bonus
Build the token so that users balance resets automatically every 30 days in addition to resetting when the smart contract upgrades. This means that the balances will reset when there is a smart contract upgrade, and they will reset on the 30 day schedule.


## Configuration

### Install Truffle cli

_Skip if you have already installed._

```
npm install -g truffle
```

### Install Dependencies

```
yarn install
```

## Test!💥

### Run Tests

```
truffle develop
test
```

```
truffle(develop)> test
Using network 'develop'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: Proxy
    delegate
      ERC-20
        totalSupply()
          √ should have initial supply of 1000000000000000000000000 (138ms)
          √ should return the correct supply (1346ms)
        balanceOf(_owner)
          √ should have correct initial balances (120ms)
          √ should return the correct balances (1221ms)
        allowance(_owner, _spender)
          √ should have correct initial allowance (155ms)
          √ should return the correct allowance (2231ms)
          when (_owner != _spender)
            √ should return the correct allowance (415ms)
          when (_owner == _spender)
            √ should return the correct allowance (419ms)
        approve(_spender, _value)
          when (_spender != sender)
            √ should return true when approving 0 (173ms)
            √ should return true when approving (154ms)
            √ should return true when updating approval (947ms)
            √ should return true when revoking approval (445ms)
            √ should update allowance accordingly (1128ms)
            √ should fire Approval event (640ms)
            √ should fire Approval when allowance was set to 0 (638ms)
            √ should fire Approval even when allowance did not change (796ms)
          when (_spender == sender)
            √ should return true when approving 0 (168ms)
            √ should return true when approving (166ms)
            √ should return true when updating approval (1199ms)
            √ should return true when revoking approval (495ms)
            √ should update allowance accordingly (1381ms)
            √ should fire Approval event (184ms)
            √ should fire Approval when allowance was set to 0 (416ms)
            √ should fire Approval even when allowance did not change (845ms)
        transfer(_to, _value)
          when (_to != sender)
            √ should return true when called with amount of 0 (138ms)
            √ should return true when transfer can be made, false otherwise (2018ms)
            √ should revert when trying to transfer something while having nothing (815ms)
            √ should revert when trying to transfer more than balance (1620ms)
            √ should not affect totalSupply (1287ms)
            √ should update balances accordingly (2041ms)
            √ should fire Transfer event (756ms)
            √ should fire Transfer event when transferring amount of 0 (176ms)
          when (_to == sender)
            √ should return true when called with amount of 0 (98ms)
            √ should return true when transfer can be made, false otherwise (1825ms)
            √ should revert when trying to transfer something while having nothing (337ms)
            √ should revert when trying to transfer more than balance (1430ms)
            √ should not affect totalSupply (1024ms)
            √ should update balances accordingly (1866ms)
            √ should fire Transfer event (548ms)
            √ should fire Transfer event when transferring amount of 0 (379ms)
        transferFrom(_from, _to, _value)
          √ should revert when trying to transfer while not allowed at all (1279ms)
          √ should fire Transfer event when transferring amount of 0 and sender is not approved (307ms)
          when (_from != _to and _to != sender)
            √ should return true when called with amount of 0 and sender is approved (270ms)
            √ should return true when called with amount of 0 and sender is not approved (189ms)
            √ should return true when transfer can be made, false otherwise (2130ms)
            √ should revert when trying to transfer something while _from having nothing (368ms)
            √ should revert when trying to transfer more than balance of _from (872ms)
            √ should revert when trying to transfer more than allowed (668ms)
            √ should not affect totalSupply (1096ms)
            √ should update balances accordingly (3068ms)
            √ should update allowances accordingly (2205ms)
            √ should fire Transfer event (747ms)
            √ should fire Transfer event when transferring amount of 0 (232ms)
          when (_from != _to and _to == sender)
            √ should return true when called with amount of 0 and sender is approved (123ms)
            √ should return true when called with amount of 0 and sender is not approved (119ms)
            √ should return true when transfer can be made, false otherwise (2539ms)
            √ should revert when trying to transfer something while _from having nothing (433ms)
            √ should revert when trying to transfer more than balance of _from (753ms)
            √ should revert when trying to transfer more than allowed (1002ms)
            √ should not affect totalSupply (1409ms)
            √ should update balances accordingly (2791ms)
            √ should update allowances accordingly (2225ms)
            √ should fire Transfer event (601ms)
            √ should fire Transfer event when transferring amount of 0 (293ms)
          when (_from == _to and _to != sender)
            √ should return true when called with amount of 0 and sender is approved (247ms)
            √ should return true when called with amount of 0 and sender is not approved (235ms)
            √ should return true when transfer can be made, false otherwise (2280ms)
            √ should revert when trying to transfer something while _from having nothing (385ms)
            √ should revert when trying to transfer more than balance of _from (787ms)
            √ should revert when trying to transfer more than allowed (826ms)
            √ should not affect totalSupply (1163ms)
            √ should update balances accordingly (2715ms)
            √ should update allowances accordingly (1799ms)
            √ should fire Transfer event (569ms)
            √ should fire Transfer event when transferring amount of 0 (388ms)
          when (_from == _to and _to == sender)
            √ should return true when called with amount of 0 and sender is approved (229ms)
            √ should return true when called with amount of 0 and sender is not approved (255ms)
            √ should return true when transfer can be made, false otherwise (2052ms)
            √ should revert when trying to transfer something while _from having nothing (449ms)
            √ should revert when trying to transfer more than balance of _from (821ms)
            √ should revert when trying to transfer more than allowed (881ms)
            √ should not affect totalSupply (1113ms)
            √ should update balances accordingly (2947ms)
            √ should update allowances accordingly (2044ms)
            √ should fire Transfer event (845ms)
            √ should fire Transfer event when transferring amount of 0 (251ms)
      ERC-20 optional
        name()
          √ should return 'NewDollar' (166ms)
        symbol()
          √ should return 'NWD' (187ms)
        decimals()
          √ should return '18' (155ms)
    upgrade
      √ should manually upgrade token and clear previous session data (1243ms)
      √ should automatically upgrade token every 30 days (1165ms)


  91 passing (3m)

```
