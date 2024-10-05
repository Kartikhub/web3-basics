import { Wallet } from "@project-serum/anchor";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { Connection, Keypair } from "@solana/web3.js";
import axios from "axios";

const JUPITER_BASE_URL = "https://quote-api.jup.ag/v6/";
const QUOTE_URL = "quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&slippageBps=50";


const connection = new Connection("https://api.mainnet-beta.solana.com");

const wallet = Keypair.fromSecretKey(bs58.decode(import.meta.env.VITE_PRIVATE_KEY || ''));

export async function fetchSwapQuote() {
  const response = await (await axios.get(JUPITER_BASE_URL + QUOTE_URL));

  const quoteResponse = response.data;
  console.log("response is: " + JSON.stringify(quoteResponse));
  
  const requestBody = {
    quoteResponse,
    userPublicKey: wallet.publicKey.toString()
  };

  console.log(requestBody);

  try {
    const { data: { swapTransaction } } = await (
      await axios.post(JUPITER_BASE_URL + 'swap', requestBody) );

  console.log("Swap Transaction is : " + swapTransaction);
  } catch (err) {
    console.log(err);
  }

}
