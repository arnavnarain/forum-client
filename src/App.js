import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import {
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { LiveRanking } from "./pages/live-ranking/LiveRanking"
import { Home } from "./pages/home-page/Home"
import { LiveMatches } from "./pages/live-matches/LiveMatches"
import { CustomNavbar as Navbar } from './components/custom-navbar/CustomNavbar';
import { Thread } from './components/thread/thread';
import { MyProfile } from './pages/my-profile/MyProfile';
const App = ({ signOut }) => {

  document.title="Tennis Connect";
  return (
    <div className="App">
      <Navbar signOut={signOut} />
      <Router> 
          <Routes> 
            <Route path="/live-ranking" element={<LiveRanking />} />
            <Route path="/live-matches" element={<LiveMatches />} />
            <Route path="*" element={<Home OAuthCallback={false} />} />
            <Route path="/r/:threadName" element={<Thread />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/oauth-callback" element={<Home OAuthCallback={true} />} />
          </Routes>  
      </Router> 
    </div>
  );
};

export default withAuthenticator(App);