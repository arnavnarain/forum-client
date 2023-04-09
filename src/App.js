import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage, Auth } from 'aws-amplify';
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { About } from "./pages/About"
import { Home } from "./pages/Home"
import { CustomNavbar as Navbar } from './components/CustomNavbar';

const App = ({ signOut }) => {


  return (
    <>
    <Navbar />
    <Router> 
        <Routes> 
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>  
        <br />
    </Router> 
    <center>
      <Button onClick={signOut}>Sign Out</Button>
    </center>
    </>
  );
};

export default withAuthenticator(App);