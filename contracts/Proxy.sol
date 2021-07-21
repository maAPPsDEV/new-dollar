// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/StorageSlot.sol";
import "./NewDollar.sol";

/**
 * @dev This abstract contract provides a fallback function that delegates all calls to another contract using the EVM
 * instruction `delegatecall`. We refer to the second contract as the _implementation_ behind the proxy, and it has to
 * be specified by overriding the virtual {_implementation} function.
 *
 * Additionally, delegation to the implementation can be triggered manually through the {_fallback} function, or to a
 * different contract through the {_delegate} function.
 *
 * The success and return data of the delegated call will be returned back to the caller of the proxy.
 */
contract Proxy is Ownable {
  /**
   * @dev Storage slot with the address of the current implementation.
   */
  bytes32 internal constant _IMPLEMENTATION_SLOT = bytes32(uint256(keccak256("proxy.implementation")) - 1);

  /// @notice The end time of the current session.
  /// @notice Shared with implementation. Slot 0.
  /// @dev After the end time, a new implementation will be generated automatically.
  uint256 public sessionEndTime;

  /**
   * @dev Emitted when the implementation is upgraded.
   */
  event NewSessionStarted(address indexed implementation, uint256 indexed endTime);

  /**
   * @dev Starts a new session once the previous one is over.
   */
  modifier inSession() {
    if (block.timestamp > sessionEndTime) {
      upgrade();
    }
    _;
  }

  /**
   * @dev The Proxy constructor.
   * It creates the first implementation automatically.
   */
  constructor() {
    upgrade();
  }

  /**
   * @dev Upgrades implementation with the give address.
   */
  function upgrade(address _implementation) external onlyOwner {
    _upgrade(_implementation);
  }

  /**
   * Upgrades implementation with new address.
   */
  function upgrade() public onlyOwner {
    _upgrade(address(new NewDollar()));
  }

  /**
   * @dev Returns the current implementation address.
   */
  function _getImplementation() internal view returns (address) {
    return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;
  }

  /**
   * Registers a new implementation, and starts new session.
   */
  function _upgrade(address _implementation) private {
    (bool result, ) = _implementation.delegatecall(abi.encodeWithSignature("initialize(address,string,string)", owner(), "NewDollar", "NWD"));
    require(result, "NewDollar: Failed to upgrade!");
    StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = _implementation;
    sessionEndTime = block.timestamp + 30 days;
    emit NewSessionStarted(_implementation, sessionEndTime);
  }

  /**
   * @dev Delegates the current call to `implementation`.
   *
   * This function does not return to its internall call site, it will return directly to the external caller.
   */
  function _delegate(address _implementation) private {
    // solhint-disable-next-line no-inline-assembly
    assembly {
      // Copy msg.data. We take full control of memory in this inline assembly
      // block because it will not return to Solidity code. We overwrite the
      // Solidity scratch pad at memory position 0.
      calldatacopy(0, 0, calldatasize())

      // Call the implementation.
      // out and outsize are 0 because we don't know the size yet.
      let result := delegatecall(gas(), _implementation, 0, calldatasize(), 0, 0)

      // Copy the returned data.
      returndatacopy(0, 0, returndatasize())

      switch result
      // delegatecall returns 0 on error.
      case 0 {
        revert(0, returndatasize())
      }
      default {
        return(0, returndatasize())
      }
    }
  }

  /**
   * @dev Delegates the current call to the address returned by `_implementation()`.
   *
   * This function does not return to its internall call site, it will return directly to the external caller.
   */
  function _fallback() private inSession {
    _delegate(_getImplementation());
  }

  /**
   * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if no other
   * function in the contract matches the call data.
   */
  fallback() external payable {
    _fallback();
  }

  /**
   * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if call data
   * is empty.
   */
  receive() external payable {
    _fallback();
  }
}
