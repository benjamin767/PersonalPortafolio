import './App.css';
import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (<>
    <Routes>
      <Route 
        path='/'
        element={<Home/>}
      />
      <Route 
        path='/register'
        element={<Register/>}
      />
    </Routes>
  </>);
}

export default App;
