import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './App.css';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Wishlist } from './pages/wishlist';
import { Navbar } from './components/navbar';
function App() {
  return (
    <div className="App">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
