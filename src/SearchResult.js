import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {
    const { number } = useParams();
    const location = useLocation();
    const result = location.state?.data || {};
    console.log(result);

    const formatTransData = (data) => {
        const formattedData = [];
        for (const key in data) {
            formattedData.push(`${key}: ${data[key]}`);
        }
        return formattedData.join('\n'); // Join the array with line breaks
    };

    const formattedData = formatTransData(result);
    console.log(formattedData);

    return (
        <div className="searchresult">
            <h2>{number}</h2>
            <pre>{formattedData}</pre>
        </div>
    );
}

export default SearchResult;