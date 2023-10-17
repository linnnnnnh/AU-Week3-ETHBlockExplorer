import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


//latestBlocks passed as a prop in LatestBlocks component:
const BlockDetails = () => {
    const { number } = useParams();
    const location = useLocation();
    const latestBlocks = location.state?.latestBlocks || {}; //to access the current location object
    const nextBlock = location.state?.obj;


    //format the json data to readable text:
    const formatBlockData = (blockData) => {
        // Create an array of key-value pairs
        const formattedData = [];
        for (const key in blockData) {
            if (blockData.hasOwnProperty(key)) {
                if (key === 'transactions') {
                    formattedData.push(`transactions: ${blockData[key].length} transactions in this blocks`);
                } else {
                    formattedData.push(`${key}: ${blockData[key]}`);
                }
            }
        }
        return formattedData.join('\n'); // Join the array with line breaks
    };

    let formattedBlockData;
    if (nextBlock) {
        formattedBlockData = formatBlockData(nextBlock);
    } else if (latestBlocks) {
        formattedBlockData = formatBlockData(latestBlocks);
    } else {
        formattedBlockData = "No block data available.";
    }

    return (
        <div className="block-details">
            <h2>Block number - {number}</h2>
            <pre>{formattedBlockData}</pre>
        </div>
    );
}

export default BlockDetails;