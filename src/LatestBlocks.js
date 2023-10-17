import alchemy from "./alchemy";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LastBlockNumberContext } from "./Latest"; //import this to reuse lastBlockNumber 

const LatestBlocks = () => {
    //use this to reuse lastBlockNumber from Latest compoenent
    const { lastBlockNumber } = useContext(LastBlockNumberContext);

    const [blockData, setBlockData] = useState();
    const history = useHistory();

    //set up the count down to fetch the latest 5 bloks:
    const fetchNextBlocks = async (count) => {
        const nextBlocks = []; //empty array to contain the new objects of data

        //set up the function to get the 5 blocks:
        for (let i = 0; i <= count; i++) {
            const nextBlockNum = lastBlockNumber - i;
            const data = await alchemy.core.getBlock(nextBlockNum);
            nextBlocks.push(data);
        }

        return nextBlocks;
    };

    //use useEffet to call the fetchNextBlocks function if latestBlocks has a value:
    useEffect(() => {
        if (lastBlockNumber) {
            fetchNextBlocks(5)
                //the "blocks" array in the useEffect function contains the same data as 
                //the nextBlocks array returned by the fetchNextBlocks function. The name of the variable doesn't affect its functionality
                .then((blocks) => {
                    setBlockData(blocks);
                })
                .catch((error) => {
                    console.error('Error fetching next blocks:', error);
                });
        }
    }, [lastBlockNumber]);

    const handleClick = async (num) => {
        try {
            if (blockData) {
                //search in the array of objects in nextBlockData and find the corresponding 
                //key value pair "number" which equals to nextBlockNum and display this object
                for (const obj of blockData) {
                    if (obj.number === num) {
                        history.push(`/block/${num}`, { obj });
                    }
                }
            }
        } catch (error) {
            console.error(`Error fetching block data for block ${blockData.number}:`, error);
        }
    };

    //calculate elapsed block time:
    // const getTime = (blockTimestamp) => {
    //     const currentTimestamp = Math.floor(Date.now() / 1000);
    //     const elapsedTimeInSeconds = currentTimestamp - blockTimestamp;
    //     const minutes = Math.floor(elapsedTimeInSeconds / 60);
    //     const seconds = elapsedTimeInSeconds % 60;
    //     const elapsedTime = `${minutes} mins & ${seconds} secs ago`;
    //     return elapsedTime;
    // }

    return (
        <div className="latest-blocks">
            <h2>Latest Blocks:</h2>
            {
                blockData && (
                    <div>
                        {blockData.map((block, index) => (
                            <button
                                key={index}
                                onClick={() => handleClick(block.number)}
                                style={{
                                    display: 'block',
                                    marginBottom: '30px',
                                    border: 'none',
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
                                {block.number}
                            </button>
                        ))}
                    </div>
                )
            }
        </div >
    );
}




export default LatestBlocks;