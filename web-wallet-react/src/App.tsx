import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39'
import { SolanaWallet } from './SolanaWallet';
import { EtherWallet } from './EtherWallet';
function App() {
  const [mnemonics, setMnemonics] = useState("");

  return (
    <div>
      <button onClick={async function() {
        const mn = await generateMnemonic();
        setMnemonics(mn);
       }}>
        Create Mnemonic
      </button>
      <input type='text' style={{width: 300, height: 50}} value={mnemonics} /> 
      {mnemonics && <SolanaWallet mnemonic={mnemonics} /> }
      {mnemonics && <EtherWallet mnemonic={mnemonics} /> }
    </div>
  )
}

export default App
