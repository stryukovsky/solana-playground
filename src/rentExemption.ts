import web3 from "@solana/web3.js";

const rentExemption = async () => {
    const accountSize = 100;
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "processed");
    const rent = await connection.getMinimumBalanceForRentExemption(accountSize);
    console.log(rent);
}

rentExemption().catch(console.error);
