import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import React, { useState, useEffect } from "react";

// pages
import { LoginPage } from "./routes/authRoute/LoginPage";
import { HomePage } from "./routes/homeRoute/HomePage";
import { RegisterPage } from "./routes/authRoute/RegisterPage";


function App() {

  // initialize from the browser local storage
  const [userName, setUserName] = useState(() => {
    const storedUserName = localStorage.getItem('username');
    return storedUserName ? localStorage.getItem('username'): "";
  });

  const [jwt, setJwt] = useState(() => {
    const storedJwt = localStorage.getItem('jwt');
    return storedJwt ? localStorage.getItem('jwt'): "";
  });

  const [isLogged, setIsLogged] = useState(() => {
    const storedKey = localStorage.getItem('isLogged');
    return storedKey ? JSON.parse(storedKey) : false;
  });


  // initializes some information with the browser local storage in order to log only once
  useEffect(() => {
    localStorage.setItem("username", userName);
    localStorage.setItem("jwt", jwt);
    localStorage.setItem('isLogged', JSON.stringify(isLogged));
  }, [userName, jwt, isLogged]);

  return (
    <Router>
      <div className="MainApp">
        <Switch>

          {/* initializes localhost to /auth */}
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

          {isLogged === true ?
            <Route exact path="/login">
              <Redirect to="/home"></Redirect>
            </Route>
            :
            <Route exact path="/home">
              <Redirect to="/login"></Redirect>
            </Route>
          }

          <Route path="/login">
            <LoginPage 
            setUserName={setUserName} setJwt={setJwt}
            setIsLogged={setIsLogged}  userName={userName}
            />
          </Route>

          <Route path="/register">
            <RegisterPage />
          </Route>

          <Route path="/home">
            <HomePage
            userName={userName} jwt={jwt}
            setIsLogged={setIsLogged}
            />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
