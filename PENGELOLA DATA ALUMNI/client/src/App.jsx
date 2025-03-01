import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import InsertData from './Services/InsertData';
import Alumni from './Pages/Alumni';
import Edit from './Services/Edit';
import Akuntansi from './Pages/FilterJurusan/Akuntansi';
import Elektro from './Pages/FilterJurusan/Elektro';
import Informatika from './Pages/FilterJurusan/Informatika';
import Manajemen from './Pages/FilterJurusan/Manajemen';
import Mesin from './Pages/FilterJurusan/Mesin';
import PAI from "./Pages/FilterJurusan/PAI";
import PPKn from "./Pages/FilterJurusan/PPKn";
import SastraJepang from './Pages/FilterJurusan/SastraJepang';
import SastraKorea from './Pages/FilterJurusan/SastraKorea';
import SastraPrancis from './Pages/FilterJurusan/SastraPrancis';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/insert-data" element={<InsertData/>} />
          <Route path="/alumni/:id" element={<Alumni/>} />
          <Route path="/edit-data/:id" element={<Edit/>}/>
          <Route path="/alumni-akuntansi" element={<Akuntansi/>}/>
          <Route path="/alumni-elektro" element={<Elektro/>}/>
          <Route path="/alumni-informatika" element={<Informatika/>}/>
          <Route path="/alumni-mesin" element={<Mesin/>}/>
          <Route path="/alumni-manajemen" element={<Manajemen/>}/>
          <Route path="/alumni-sastra-jepang" element={<SastraJepang/>}/>
          <Route path="/alumni-sastra-korea" element={<SastraKorea/>}/>
          <Route path="/alumni-sastra-prancis" element={<SastraPrancis/>}/>
          <Route path="/alumni-pai" element={<PAI/>}/>
          <Route path="/alumni-ppkn" element={<PPKn/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
