import { mnemonicToSeed } from "bip39";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import { useState } from "react";

export function EtherWallet({ mnemonic }: { mnemonic: string }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

    return <div>
        <button onClick={async function() {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed) ;
            const child = hdNode.derivePath(path);
            const privateKey = child.privateKey;
            const ethWallet = new Wallet(privateKey);
            setCurrentIndex(currentIndex+1);
            setAddresses([...addresses, ethWallet.address]);
        }}>
            Create Etherium Wallet
        </button>
        {addresses.map(p => <div>
                Eth - {p}
            </div>)}
    </div>
}