import React, { useState } from "react";

import "./App.css";
import Sidebar from "./Components/Sidebar";
import SidebarChat from "./Components/SidebarChat";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/Login";
import { useStateValue } from "./Auth/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__container">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomid">
                <SidebarChat />
              </Route>
              <Route path="/">
                <SidebarChat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
