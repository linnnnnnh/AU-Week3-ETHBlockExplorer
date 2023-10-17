import { Link } from 'react-router-dom';
import { LastBlockNumberContext } from "./Latest";
import { useContext } from 'react';

const Navbar = () => {
    const { lastBlockNumber } = useContext(LastBlockNumberContext);

    return (
        <div className="navbar-container">
            <div className="under-navbar">
                <p>{lastBlockNumber}</p>
            </div>
            <div className="navbar">
                <h1>Ethereum Block Explorer</h1>
                <div className="links">
                    <Link to="/">Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;