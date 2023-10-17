import alchemy from "./alchemy";
import { useEffect, useState } from 'react';
import { createContext } from 'react';

// I use Context API to create a Context object so that the variables can be reused in any other components: 

export const LastBlockNumberContext = createContext();

const Latest = ({ children }) => {
    const [lastBlockNumber, setLastBlockNumber] = useState();
    const [blockHash, setBlockHash] = useState();

    useEffect(() => {
        async function getLastBlockNumber() {
            setLastBlockNumber(await alchemy.core.getBlockNumber());
        }

        getLastBlockNumber();
    });

    useEffect(() => {
        async function getBlockHash() {
            let blockNum = lastBlockNumber;

            setBlockHash((await alchemy.core.getBlock(blockNum)).hash);
        }

        getBlockHash();
    }, [lastBlockNumber]);

    return (
        <LastBlockNumberContext.Provider value={{ lastBlockNumber, setLastBlockNumber, blockHash, setBlockHash }}>
            {children}
        </LastBlockNumberContext.Provider>
    );
};

export default Latest;

