import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createContext, useState } from "react";
import HomePage from "./HomePage/HomePage";
import Login from "./Component/Login/Login";
import RegisterForm from "./Component/RegisterForm/RegisterForm";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    photo: "",
    name: "",
  });

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/register/:id">
            <RegisterForm></RegisterForm>
          </PrivateRoute>

          <Route path="*">
            <h1>page not found</h1>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
