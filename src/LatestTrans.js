import alchemy from "./alchemy";
import { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { LastBlockNumberContext } from "./Latest";


//using blockHash as a props to get the transaction hashes of the last block: 
const LatestTrans = () => {
    const { blockHash } = useContext(LastBlockNumberContext);
    const [latestTrans, setLatestTrans] = useState();
    const history = useHistory();

    //get the latest transaction hashes: 
    useEffect(() => {
        async function getLatestTrans() {
            const params = {
                blockHash: blockHash
            };

            let response = await alchemy.core.getTransactionReceipts(params);

            const transList = [];
            for (let i = 0; i <= 5; i++) {
                let tx = await response.receipts[i].transactionHash;
                transList.push(tx);
            }
            //!!!!: calling setLatestTrans(transList) inside the loop was incorrect. 
            //React's state updates may be asynchronous, which could result in odd behaviors => only one button shows up
            //setLatestTrans() should be used outside the for loop
            setLatestTrans(transList);
        }

        getLatestTrans();
    }, [blockHash]);

    //function to get the transaction details based on the transaction hash:
    // !!!!: no need to use async/await here as the function is not invoked here
    const getTransReceipt = (txHash) => {
        const tx = txHash;
        let response = alchemy.core.getTransactionReceipt(tx);
        return response;
    }

    const handleClickTrans = async (num) => {
        try {
            if (latestTrans) {
                for (let i = 0; i < latestTrans.length; i++) {
                    if (latestTrans[i] === num) {
                        //!!!!:since I call the function here, async/await should be used here
                        const transReceipt = await getTransReceipt(num);
                        history.push(`/transaction/${transReceipt.transactionHash}`, { transReceipt });
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching transaction details:", error);
        }
    };

    return (
        <div className="latest-trans">
            <h2>Latest Transactions:</h2>
            {latestTrans && (
                <div>
                    {latestTrans.map((tx, index) => (
                        <button
                            key={index}
                            onClick={() => handleClickTrans(tx)}
                            style={{
                                display: 'block',
                                border: 'none',
                                marginBottom: '30px',
                                background: 'transparent',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                outline: 'none',
                                fontSize: '20px',
                                margin: '10px 0',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#266d1070";
                                e.currentTarget.style.color = "white";
                                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "inherit";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            {tx.substring(0, 20)}...
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LatestTrans;