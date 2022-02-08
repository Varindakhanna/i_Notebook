import Navbar from "./components/Navbar";
import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Alert from "./components/Alert";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./Context/notes/NotesState";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const[alert,Setalert] = useState(null);
  
  const showAlert = (message,type)=>
  {
    Setalert({

      msg: message,
      type: type
      
    })

    setTimeout(() =>

    {
      Setalert(null);

    },1500);
  
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert ={alert}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
