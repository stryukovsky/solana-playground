import web3 from "@solana/web3.js";
import { secretKey } from "./secretKey";

const versionedTransactions = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "processed");
    const payer = web3.Keypair.fromSecretKey(secretKey);
    const instructions = [
        web3.SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: payer.publicKey,
            lamports: 123
        })
    ];
    const blockhash = await connection.getLatestBlockhash().then((res) => res.blockhash);
    const messageV0 = new web3.TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: blockhash,
        instructions
    }).compileToV0Message();
    const transaction = new web3.VersionedTransaction(messageV0);
    transaction.sign([payer]);

    const txId = await connection.sendTransaction(transaction);
    console.log(txId);
};

versionedTransactions().catch(console.error);
