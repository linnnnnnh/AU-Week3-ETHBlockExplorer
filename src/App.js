import './App.css';
import BlockDetails from './BlockDetails';
import Latest from './Latest';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import TransactionDetails from './TransactionDetails';
import LatestBlocks from './LatestBlocks';
import LatestTrans from './LatestTrans';
import SearchComponent from './SearchBar';
import SearchResult from './SearchResult';


function App() {

  return (
    <Latest>
      <Router>
        <div className="App">
          <Navbar />
          <SearchComponent />
          <div className="latest">
            <Switch>
              <Route exact path="/">
                <LatestBlocks />
                <LatestTrans />
              </Route>
              <Route path="/block/:number">
                <BlockDetails />
              </Route>
              <Route path="/transaction/:number">
                <TransactionDetails />
              </Route>
              <Route path="/searchresult/:number">
                <SearchResult />
              </Route>
            </Switch>
          </div>
        </div>
      </Router >
    </Latest>
  );
}

export default App;
