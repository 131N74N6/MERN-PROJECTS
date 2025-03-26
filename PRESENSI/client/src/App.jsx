import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./Utilities/Loading";
import "./App.css";

const SignIn = lazy(() => import("./Services/SignIn"));
const Attendance = lazy(() => import("./Pages/Attendance"));
const Personal = lazy(() => import("./Pages/Personal"));
const ListSiswa = lazy(() => import("./Pages/List-Siswa"));
const Pelajaran = lazy(() => import("./Pages/Pelajaran"));
const Identity = lazy(() => import("./Pages/Data-Diri"));

export default function App() {
    return (
        <Suspense fallback={<Loading/>}>
            <Router>
                <Routes>
                    <Route path="/" element={<SignIn/>}/>
                    <Route path="/attendance" element={<Attendance/>}/>
                    <Route path="/personal" element={<Personal/>}/>
                    <Route path="/siswa" element={<ListSiswa/>}/>
                    <Route path="/pelajaran" element={<Pelajaran/>}/>
                    <Route path="/identity" element={<Identity/>}/>
                </Routes>
            </Router>
        </Suspense>
    )
}
