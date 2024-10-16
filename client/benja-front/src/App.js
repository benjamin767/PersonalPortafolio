import './App.css';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Contact from './components/Contact/Contact.jsx';
import { Route, Routes } from 'react-router-dom';
import Footer from "../src/components/Footer/Footer";
import Register from './components/Register/Register.jsx';
import Login from "./components/Login/Login.jsx";
import Profile from './components/Profile/Profile.jsx';
import CreateProject from './components/CreateProject/CreateProject.jsx';
import CreateTech from "./components/CreateTech/CreateTech.jsx"

function App() {
  return (<>
    <NavBar/>
      <Routes>
        <Route 
          path='/'
          element={<Home/>}
        />
        <Route 
          path='/contact'
          element={<Contact/>}
        />
        <Route 
          path='/register'
          element={<Register/>}
        />
        <Route 
          path='/login'
          element={<Login/>}
        />
        <Route 
          path='/profile'
          element={<Profile/>}
        />
        <Route 
          path='/create-project'
          element={<CreateProject/>}
        />
        <Route 
          path='/create-tech'
          element={<CreateTech/>}
        />
      </Routes>
    <Footer/>
  </>);
}

export default App;
