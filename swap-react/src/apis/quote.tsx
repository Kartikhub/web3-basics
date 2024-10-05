import bs58 from "bs58";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
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
    const swapTrxnBuf = Buffer.from(swapTransaction, 'base64');
    console.log("Swap Buf: " + swapTrxnBuf);
    
    var transaction = VersionedTransaction.deserialize(swapTrxnBuf);

    console.log(transaction);

    transaction.sign([wallet]);
    console.log('1');

    const rawTransaction = transaction.serialize();

    const transactionId = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      maxRetries: 2
    });
    
    console.log('2');
    await connection.confirmTransaction(transactionId);
    console.log('3');
    console.log(`https://solscan.io/tx/${transactionId}`);
  } catch (err) {
    console.log(err);
  }


}
