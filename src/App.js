import logo from "./logo.svg";
import "./App.css";
// import {} from "react-bootstrap";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Statedata from "./Components/Statedata";
import India from "./Components/India";
import Header from "./Components/Header";
import World from "./Components/World";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <India />
            </Route>
            <Route path="/india">
              <India />
            </Route>
            <Route path="/world">
              <World />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
