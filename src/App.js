import logo from './logo.svg';
import './App.css';
import Layout from './Components/Pages/Layout';
import Hpage from './Components/Pages/Hpage/Hpage';
import Ezbuilders from './Components/Pages/Ezbuilders/Ezbuilders'
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Homepage from './Components/Homepage/Homepage';
function App() {
  return (
<>



<Routes>
   <Route path="/" element={<Homepage />} />
   <Route path="/Ezbuilders" element={<Ezbuilders/>} />
   <Route path="/contact" element={''} />
</Routes>

</>
  );
}

export default App;
