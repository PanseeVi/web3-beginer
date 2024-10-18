'use client'
import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import dotenv from 'dotenv'
import { error } from 'console'
import {
  transferBalance,
  getBalance,
  transferBalanceByPrivateKey,
  approveBalance,
  approveBalanceByPrivateKey,
  messageSign,
  transferFromByPrivateKey,
  burnTokenByPrivateKey,
  burnTokenFromByPrivateKey,
} from '../../../../../contract'
import { sign } from 'crypto'

dotenv.config()

const testnet = 'https://data-seed-prebsc-1-s1.bnbchain.org:8545'
const tokenAddress = '0xBfB5D7d476E9BBDE37A8749aa9D95E7Ad2210214'
const walletTest = '0x0B37aB45502936580842aAA66B989E2694290976'
const walletTest2 = '0x7cc26aB2377B28813401d7c7A46a7488687cCACd'
const walletTest3 = '0xb4dB16A3859D88DDDE945B5E5eD3aA393AF8c3A3'

const web3 = new Web3(testnet)

// const getBalance = async () => {
//   const balanceWei = await web3.eth.getBalance(walletTest)
//   const balanceBnB = web3.utils.fromWei(balanceWei, 'ether')
//   return balanceBnB
// }

// const transferBalance = async () => {
//   try {
//     const nonce = await web3.eth.getTransactionCount(walletTest, 'latest')

//     const transaction = {
//       to: walletTest2,
//       value: web3.utils.toWei('0.001', 'ether'),
//       gas: 21000,
//       gasPrice: await web3.eth.getGasPrice(),
//       nonce: nonce,
//       chainId: 97,
//     }

//     console.log('Signing transaction...')

//     const signedTransaction = await web3.eth.accounts
//       .signTransaction(transaction, privateKey)
//       .catch((error) => {
//         console.log('loi', error)
//       })
//     console.log('signedTrans', signedTransaction)

//     console.log('Sending signed transaction...')

//     const receipt = await web3.eth.sendSignedTransaction(
//       signedTransaction.rawTransaction
//     )

//     console.log('Giao dịch thành công:', receipt)
//     alert('Đã chuyển thành công')
//   } catch (error) {
//     console.error('Lỗi khi chuyển tiền:', error)
//   }
// }

const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    console.log('connecting...')
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      return accounts[0]
    } catch (error) {
      console.error('User denied account access')
    }
  }
}

// const transferBalance = async () => {
//   try {
//     await window.ethereum.request({
//       method: 'eth_sendTransaction',
//       params: [
//         {
//           from: walletTest,
//           to: walletTest2,
//           value: web3.utils.toWei('0.001', 'ether'),
//           gas: 21000,
//           gasPrice: await web3.eth.getGasPrice().then(console.log),
//         },
//       ],
//     })
//     console.log('step2')
//   } catch (error) {
//     console.log('err', error)
//   }
// }

export default function Wallet() {
  const [balance, setBalance] = useState('')
  const [walletDefault, setWalletDefault] = useState('')

  const walletConnected = async () => {
    setWalletDefault(await connectWallet())
  }

  const balanceClicked = async () => {
    setBalance(await getBalance(walletTest))
  }
  //transfer
  const sendBalance = async () => {
    await transferBalance(walletTest, walletTest2, 5000)
  }
  const sendBalanceByP = async () => {
    await transferBalanceByPrivateKey(walletTest, walletTest2, 5000)
  }
  const transferFromByP = async () => {
    await transferFromByPrivateKey(walletTest, walletTest2, walletTest3, 5000)
  }

  //burn token

  const burnClicked = async () => {
    await burnTokenByPrivateKey(walletTest, 5000)
  }
  const burnFromClicked = async () => {
    await burnTokenFromByPrivateKey(walletTest, walletTest2, 10000)
  }

  // approve
  const approveBalanceClicked = async () => {
    await approveBalance(walletTest, walletTest2, 50000)
  }
  const approveBalanceByPrivClicked = async () => {
    await approveBalanceByPrivateKey(walletTest, walletTest2, 5000)
  }

  const personalSign = async () => {
    await messageSign()
  }

  useEffect(() => {
    const fetchData = async () => {
      const balance = await getBalance(walletDefault)
      setBalance(balance)
    }

    fetchData()
  }, [walletDefault])

  return (
    <div>
      <h1 className='m-24'>Connect your wallet</h1>
      <div>
        <button
          onClick={walletConnected}
          className='bg-cyan-500 px-3 rounded my-4'
        >
          Connect Wallet
        </button>
        <h4>{walletDefault}</h4>
      </div>
      <div>
        <button onClick={balanceClicked} className='bg-cyan-500 px-3 rounded'>
          Get Balance
        </button>
      </div>
      <div>
        <ul>
          <li>FLP: {balance ? balance : 0}</li>
          <li>ETH: 0</li>
          <li>C98: 0</li>
        </ul>
      </div>
      <div className='h-40 mt-8'>
        <div className='flex gap-4 justify-center'>
          <button
            className='bg-cyan-400 text-neutral-950 px-4 rounded-3xl'
            onClick={sendBalance}
          >
            Chuyểnn token
          </button>
          <button
            className='bg-cyan-400 text-neutral-950 px-4 rounded-3xl'
            onClick={sendBalanceByP}
          >
            {' '}
            chuyển token <br />
            bằng privatekey
          </button>
          <button
            className='bg-cyan-400 text-neutral-950 px-4 rounded-3xl'
            onClick={transferFromByP}
          >
            {' '}
            transferFrom <br />
            by privatekey
          </button>
          <button
            className='bg-cyan-400 text-neutral-950 px-4 rounded-3xl'
            onClick={approveBalanceClicked}
          >
            {' '}
            Approve
          </button>
          <button
            className='bg-cyan-400 text-neutral-950 px-4 rounded-3xl'
            onClick={approveBalanceByPrivClicked}
          >
            {' '}
            Approve by <br /> privatekey
          </button>
          <button
            className='bg-cyan-400 text-neutral-950 px-4 rounded-3xl'
            onClick={personalSign}
          >
            {' '}
            personal sign
          </button>
        </div>
        <div className='h-40 mt-8'>
          <div className='flex gap-4 justify-center'>
            <button
              className='bg-cyan-400 text-neutral-950 px-4 rounded-3xl'
              onClick={burnClicked}
            >
              burn
            </button>
            <button
              className='bg-cyan-400 text-neutral-950 px-4 rounded-3xl'
              onClick={burnFromClicked}
            >
              burn token <br />
              by privatekey
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
