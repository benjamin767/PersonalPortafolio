import './App.css';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Contact from './components/Contact/Contact.jsx';
import { Route, Routes } from 'react-router-dom';
import Footer from "../src/components/Footer/Footer";

function App() {
  return (<>
    <NavBar/>
    <Routes>
      <Route 
        path='/'
        element={<Home/>}
      />
      <Route 
        path='/register'
        element={<Contact/>}
      />
    </Routes>
    <Footer/>
  </>);
}

export default App;
