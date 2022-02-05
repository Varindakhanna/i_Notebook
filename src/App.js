import Navbar from "./components/Navbar";
import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Alert from "./components/Alert";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./Context/notes/NotesState";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message = {" hello "}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
