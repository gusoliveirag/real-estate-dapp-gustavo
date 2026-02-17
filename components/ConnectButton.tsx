'use client'
import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

// Global interface to prevent TypeScript errors with window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function ConnectButton() {
  const [currentAccount, setCurrentAccount] = useState<string>('')

  // Requests wallet connection
  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        })
        setCurrentAccount(accounts[0])
      } catch (error) {
        console.error("Connection request rejected by user", error)
      }
    } else {
      alert('MetaMask not detected. Please install the extension.')
    }
  }

  // Setup event listeners for account and network changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      
      // Mandatory: Handle account switching
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setCurrentAccount(accounts[0] || '')
      })

      // Mandatory: Handle network switching
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }, [])

return (
    <button 
      onClick={connectWallet} 
      className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-md transition-all"
    >
      {currentAccount 
        ? `Connected: ${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}` 
        : "Connect Wallet"}
    </button>
  );
}