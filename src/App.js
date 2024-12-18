import logo from './logo.svg';
import './App.css';
import Layout from './Components/Pages/Layout';
import Hpage from './Components/Pages/Hpage/Hpage';
import Ezbuilders from './Components/Pages/Ezbuilders/Ezbuilders'
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Homepage from './Components/Homepage/Homepage';
import FTL from './Components/Pages/ftl/ftl';
import FTLD from './Components/Pages/ftld/ftld';
import FTLH from './Components/Pages/ftlh/ftlh';
import FTLS from './Components/Pages/ftls/ftls';
import Pvilion from './Components/Pages/pvilion/pvilion';
import CollaboratorsEZ from './Components/Pages/collaborators/collaborators_EZ';
import CollaboratorsFTL from './Components/Pages/collaborators/collaborators_FTL';
import CollaboratorsSOLAR from './Components/Pages/collaborators/collaborators_SOLAR';
import CollaboratorsPVILION from './Components/Pages/collaborators/collaborators_PVILION';
import Contact from './Components/Pages/Contact/Contact';
function App() {
  return (
<>


<HashRouter>
<Routes>
   <Route path="/" element={<Homepage />} />
   <Route path="/Ezbuilders" element={<Ezbuilders/>} />
   <Route path ="/ftl" element = {<FTL/>} />
   <Route path ="/ftld" element = {<FTLD/>} />
   <Route path ="/ftlh" element = {<FTLH/>} />
   <Route path ="/ftls" element = {<FTLS/>} />
   <Route path ="/pvilion" element = {<Pvilion/>} />
   <Route path ="/collaboratorsez" element = {<CollaboratorsEZ/>} />
   <Route path ="/collaboratorsftl" element = {<CollaboratorsFTL/>} />
   <Route path ="/collaboratorssolar" element = {<CollaboratorsSOLAR/>} />
   <Route path ="/collaboratorspvilion" element = {<CollaboratorsPVILION/>} />
   <Route path ="/contact" element = {<Contact/>} />
   <Route path="/contact" element={''} />
</Routes>
</HashRouter>
</>
  );
}

export default App;
