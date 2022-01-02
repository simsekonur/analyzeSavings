import './App.css';

import NavbarComp from "./components/NavbarComp";
import ListCoins from "./components/ListCoins";
import BuyOrSellCoin from "./components/BuyOrSellCoin";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App(){

  return (
    <div>
      <Router>
      <NavbarComp />
      <Switch>
        <Route exact path="/">
          <ListCoins />
        </Route>
        <Route exact path="/buyOrSell">
          <BuyOrSellCoin />
        </Route>
      </Switch>
    </Router>
    </div>
  );


}