
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen.js';
import CreateScreen from './Screens/CreateScreen.js';

import Header from './components/Header.js';
import Footer from './components/Footer';

import { Container } from 'react-bootstrap'
import UpdateScreen from './Screens/UpdateScreen.js';
import AuthScreen from './Screens/AuthScreen.js';

import React  from 'react';

const App = () => {
  return (
    <Router> 
      <Header/>
      <main className='py-3'>
         <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/create" element={<CreateScreen />} />
              <Route path="/update/:id" element={<UpdateScreen/>} />
              <Route path="/auth" element={<AuthScreen />} />
            </Routes>
        </Container>
        </main>
        <Footer/>
    </Router>
  );
};

export default App
