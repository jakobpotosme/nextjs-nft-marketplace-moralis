import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useMoralisQuery, useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";

export default function Home() {
    // we will index the events off-chain and then read from our database
    // setup server and listen to these events
    const { isWeb3Enabled } = useMoralis();

    const {
        data: listedNfts,
        error,
        isFetching: fetchingListedNfts,
    } = useMoralisQuery("ActiveItem", (query) => query.limit(10).descending("tokenId"));

    console.log(listedNfts);

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap gap-2">
                {isWeb3Enabled ? (
                    fetchingListedNfts ? (
                        <div>Loading... </div>
                    ) : (
                        listedNfts.map((nft) => {
                            console.log(nft.attributes);
                            const {
                                objectId,
                                price,
                                nftAddress,
                                tokenId,
                                marketplaceAddress,
                                seller,
                            } = nft.attributes;
                            return (
                                <NFTBox
                                    key={objectId}
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                />
                            );
                        })
                    )
                ) : (
                    <div>Web3 is not enabled </div>
                )}
            </div>
        </div>
    );
}
