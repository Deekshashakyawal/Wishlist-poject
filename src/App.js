import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Wishlist } from './pages/wishlist';
import { Navbar } from './components/navbar';
import { AppContext } from './AppContext';
import { useState } from 'react';

function App() {
  const [userState, forceRender]=useState(false); //No user logged in initially
  return (
    <div className="App">
      <AppContext.Provider value={{userState, forceRender}}>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
      </Routes>
    </Router>
    </AppContext.Provider>
  </div>
  );
}

export default App;
