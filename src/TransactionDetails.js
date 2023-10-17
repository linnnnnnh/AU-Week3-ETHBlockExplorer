import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const TransactionDetails = () => {
    const { number } = useParams();
    const location = useLocation();
    const transReceipt = location.state?.transReceipt || {};

    //format the json data to readable text: !!!! very useful to format json data
    const formatTransData = (data) => {
        // Create an array of key-value pairs
        const formattedData = [];
        for (const key in data) {
            formattedData.push(`${key}: ${data[key]}`);
        }
        return formattedData.join('\n'); // Join the array with line breaks
    };

    const formattedData = formatTransData(transReceipt);


    return (
        <div className="transactionDetails">
            <h2>Transaction - {number}</h2>
            <pre>{formattedData}</pre>
        </div>

    );
}

export default TransactionDetails;