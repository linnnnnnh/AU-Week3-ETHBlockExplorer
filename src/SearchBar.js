import { useState, useEffect } from "react";
import alchemy from "./alchemy";
import { useHistory } from "react-router-dom";


const SearchBar = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setSearchTerm("");
    }, []);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        handleSearch(searchTerm);
    };

    return (
        <div className="searchbar">
            <input
                type="text"
                placeholder="Block / Txn hash / Address / ENS..."
                value={searchTerm}
                onChange={handleChange}
            />
            <button onClick={handleSearchClick}>Search</button>
        </div>
    );
};

const SearchComponent = () => {
    const [data, setData] = useState([]);
    const history = useHistory();

    const getBlock = async (searchTerm) => {
        let txHash = Number(searchTerm);
        return await alchemy.core.getBlock(txHash);
    }

    const getTransaction = async (searchTerm) => {
        const tx = searchTerm;
        return await alchemy.core.getTransactionReceipt(tx);
    }

    const getBalance = async (searchTerm) => {
        const address = searchTerm;
        let balance = await alchemy.core.getBalance(address);
        return balance;
    }

    const getTransactionCount = async (searchTerm) => {
        const address = searchTerm;
        let count = await alchemy.core.getTransactionCount(address);
        return count;
    }

    const handleSearch = async (searchTerm) => {

        if (searchTerm === "") {
            setData([]);
            return;
        }

        try {
            let blockResult = await getBlock(searchTerm);
            setData(blockResult);
            history.push(`/searchresult/${searchTerm}`, { data: blockResult });
            return;
        } catch (error) {
            console.log('Error in getBlock:', error.message);
        }

        try {
            let transactionResult = await getTransaction(searchTerm);
            setData(transactionResult);
            history.push(`/searchresult/${searchTerm}`, { data: transactionResult });
            return;
        } catch (error) {
            console.log('Error in getTransactionReceipt:', error.message);
        }

        try {
            const [balanceResult, countResult] = await Promise.all([
                getBalance(searchTerm),
                getTransactionCount(searchTerm)
            ]);

            if (balanceResult && countResult) {
                const resultData = { balance: balanceResult, count: countResult };
                setData(resultData);
                history.push(`/searchresult/${searchTerm}`, { data: resultData });
                return;
            } else {
                console.error("Both getBalance and getCount calls failed.");
            }
        } catch (error) {
            console.log('Error in getBalance and getCount:', error.message);
        }

        return 'No function returned a valid result';
    };

    console.log(data);

    return (
        <div>
            <SearchBar handleSearch={handleSearch} />
        </div>
    );
};

export default SearchComponent;
