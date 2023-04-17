import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { About } from "./pages/About"
import { Home } from "./pages/home-page/Home"
import { Popular } from "./pages/Popular"
import { CustomNavbar as Navbar } from './components/custom-navbar/CustomNavbar';
const App = ({ signOut }) => {
  
  return (
    <div className="App">
      <Navbar signOut={signOut} />
      <Router> 
          <Routes> 
            <Route path="/about" element={<About />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="*" element={<Home />} />
          </Routes>  
      </Router> 
    </div>
  );
};

export default withAuthenticator(App);