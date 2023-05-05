import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import {
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { About } from "./pages/About"
import { Home } from "./pages/home-page/Home"
import { Popular } from "./pages/popular/Popular"
import { CustomNavbar as Navbar } from './components/custom-navbar/CustomNavbar';
import { Thread } from './components/thread/thread';
import { MyProfile } from './pages/my-profile/MyProfile';
const App = ({ signOut }) => {

  document.title="Bulletin Board";
  return (
    <div className="App">
      <Navbar signOut={signOut} />
      <Router> 
          <Routes> 
            <Route path="/about" element={<About />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="*" element={<Home />} />
            <Route path="/r/:threadName" element={<Thread />} />
            <Route path="/myprofile" element={<MyProfile />} />
          </Routes>  
      </Router> 
    </div>
  );
};

export default withAuthenticator(App);