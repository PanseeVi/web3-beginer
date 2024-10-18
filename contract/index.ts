import Web3, { utils } from 'web3'
import dotenv from 'dotenv'
import { error } from 'console'
import { toBeHex } from 'ethers'
import { Signature } from 'ethers'

const testnet = 'https://data-seed-prebsc-1-s1.bnbchain.org:8545'
const tokenAddress = '0xBfB5D7d476E9BBDE37A8749aa9D95E7Ad2210214'
const privateKey = ''
const privateKey2 = ''
const web3 = new Web3(testnet)
const minABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'allowance',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'needed',
        type: 'uint256',
      },
    ],
    name: 'ERC20InsufficientAllowance',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'needed',
        type: 'uint256',
      },
    ],
    name: 'ERC20InsufficientBalance',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'approver',
        type: 'address',
      },
    ],
    name: 'ERC20InvalidApprover',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
    ],
    name: 'ERC20InvalidReceiver',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'ERC20InvalidSender',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'ERC20InvalidSpender',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const contract = new web3.eth.Contract(minABI, tokenAddress)

export const getBalance = async (walletTest: any) => {
  const result = await contract.methods.balanceOf(walletTest).call()
  const resultInEther = web3.utils.fromWei(result, 'ether')
  console.log(`Balance in wei: ${result}`)

  console.log(`Balance in ether: ${resultInEther}`)
  return resultInEther
}

export const transferBalance = async (
  walletTest: any,
  walletTest2: any,
  amount: any
) => {
  const nonce = await web3.eth.getTransactionCount(walletTest, 'latest')
  const nonceHex = await web3.utils.toHex(nonce)
  console.log(nonce)
  const amountS = web3.utils.toWei(amount, 'ether')
  console.log('pending')
  try {
    console.log(walletTest, amount, walletTest2)
    const data = await contract.methods
      .transfer(walletTest2, amountS)
      .encodeABI()
    console.log('transf data', data)
    console.log(window.ethereum.request, 'window log')
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: tokenAddress,
          from: walletTest,
          gas: '0x186a0',
          value: '0x0',
          data: data,
          nonce: nonceHex,
          gasPrice: '0x4a817c800',
        },
      ],
    })
  } catch (error) {
    console.log('wallet error', error)
  }
}
export const transferBalanceByPrivateKey = async (
  walletTest: any,
  address: any,
  amount: any
) => {
  const amountS = web3.utils.toWei(amount, 'ether')
  const nonce = await web3.eth.getTransactionCount(walletTest, 'pending')
  const nonceHex = web3.utils.toHex(nonce)
  const getGasPrice = await web3.eth.getGasPrice()
  console.log('pending', getGasPrice)
  console.log('pending..', { nonce })
  const data = contract.methods.transfer(address, amountS).encodeABI()
  const dataTX = {
    to: tokenAddress,
    from: walletTest,
    gasLimit: 81000,
    // gas: '0x186a0',
    data: data,
    nonce: nonceHex,
    gasPrice: web3.utils.toHex(getGasPrice),
  }

  signContract(dataTX, privateKey)
}
export const transferFromByPrivateKey = async (
  walletTest: any,
  addressFrom: any,
  addressTo: any,
  amount: any
) => {
  const amountS = web3.utils.toWei(amount, 'ether')
  const nonce = await web3.eth.getTransactionCount(addressFrom, 'pending')
  const nonceHex = web3.utils.toHex(nonce)
  const getGasPrice = await web3.eth.getGasPrice()
  console.log('pending', getGasPrice)
  console.log('pending..', { nonce })
  const data = contract.methods
    .transferFrom(walletTest, addressTo, amountS)
    .encodeABI()
  const dataTX = {
    to: tokenAddress,
    from: addressFrom,
    gasLimit: 81000,
    // gas: '0x186a0',
    data: data,
    nonce: nonceHex,
    gasPrice: web3.utils.toHex(getGasPrice),
  }
  signContract(dataTX, privateKey2)
}

//burn methods

export const burnTokenByPrivateKey = async (addressBurn: any, amount: any) => {
  const nonce = await web3.eth.getTransactionCount(addressBurn, 'pending')
  const nonceHex = await web3.utils.toHex(nonce)
  console.log(nonce)
  const amountS = web3.utils.toWei(amount, 'ether')
  const getGasPrice = await web3.eth.getGasPrice()
  console.log('burning...')
  try {
    const data = await contract.methods.burn(amountS).encodeABI()
    const dataTX = {
      to: tokenAddress,
      from: addressBurn,
      data: data,
      gasLimit: 81000,
      gasPrice: web3.utils.toHex(getGasPrice),
      nonce: nonceHex,
    }
    signContract(dataTX, privateKey)
  } catch (error) {
    console.log(error)
    alert('Không thành công')
  }
}
export const burnTokenFromByPrivateKey = async (
  walletTest: any,
  addressFrom: any,
  amount: any
) => {
  const amountS = web3.utils.toWei(amount, 'ether')
  const nonce = await web3.eth.getTransactionCount(addressFrom, 'pending')
  const nonceHex = web3.utils.toHex(nonce)
  const getGasPrice = await web3.eth.getGasPrice()
  console.log('pending', getGasPrice)
  console.log('pending..', { nonce })
  const data = contract.methods.burnFrom(walletTest, amountS).encodeABI()
  const dataTX = {
    to: tokenAddress,
    from: addressFrom,
    gasLimit: 81000,
    // gas: '0x186a0',
    data: data,
    nonce: nonceHex,
    gasPrice: web3.utils.toHex(getGasPrice),
  }
  signContract(dataTX, privateKey2)
}
// approve methods
export const approveBalance = async (
  walletTest: any,
  walletTest2: any,
  amount: any
) => {
  const nonce = await web3.eth.getTransactionCount(walletTest, 'latest')
  const nonceHex = await web3.utils.toHex(nonce)
  console.log(nonce)
  const amountS = web3.utils.toWei(amount, 'ether')
  console.log('pending')
  try {
    console.log(walletTest, amount, walletTest2)
    const data = await contract.methods
      .approve(walletTest2, amountS)
      .encodeABI()
    console.log('transf data', data)
    console.log(window.ethereum.request, 'window log')
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: tokenAddress,
          from: walletTest,
          gas: '0x186a0',
          value: '0x0',
          data: data,
          nonce: nonceHex,
          gasPrice: '0x4a817c800',
        },
      ],
    })
  } catch (error) {
    console.log('wallet error', error)
  }
}
export const approveBalanceByPrivateKey = async (
  walletTest: any,
  address: any,
  amount: any
) => {
  const amountS = web3.utils.toWei(amount, 'ether')
  const nonce = await web3.eth.getTransactionCount(walletTest, 'pending')
  const nonceHex = web3.utils.toHex(nonce)
  const getGasPrice = await web3.eth.getGasPrice()
  console.log('pending', getGasPrice)
  console.log('pending..', { nonce })
  const data = contract.methods.approve(address, amountS).encodeABI()
  const dataTX = {
    to: tokenAddress,
    from: walletTest,
    gasLimit: 81000,
    // gas: '0x186a0',
    data: data,
    nonce: nonceHex,
    gasPrice: web3.utils.toHex(getGasPrice),
  }

  signContract(dataTX, privateKey)
}

// sign message methods
export const messageSign = async () => {
  const message = 'sign by metamask'
  await window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(async (accounts: any) => {
      const addressUser = accounts[0]
      await window.ethereum
        .request({
          method: 'personal_sign',
          params: [web3.utils.utf8ToHex(message), addressUser],
        })
        .then((signature: any) => {
          console.log(message)
          console.log(signature)
          const recoveryAddress = web3.eth.accounts.recover(message, signature)
          if (addressUser.toLowerCase() === recoveryAddress.toLowerCase()) {
            console.log('Chữ ký hợp lệ và khớp với địa chỉ mong đợi.')
            alert('Thành công')
          } else {
            console.log(
              'Chữ ký không hợp lệ hoặc không khớp với địa chỉ mong đợi.'
            )
            alert('Không thành công')
          }
        })
    })
}

const signContract = async (dataTX: any, privateKey: any) => {
  const transferByPriv = await web3.eth.accounts.signTransaction(
    dataTX,
    privateKey
  )
  await web3.eth
    .sendSignedTransaction(transferByPriv.rawTransaction)

    .on('transactionHash', console.log)
    .on('receipt', console.log)
    .on('error', console.log)
  alert('well done')
}
