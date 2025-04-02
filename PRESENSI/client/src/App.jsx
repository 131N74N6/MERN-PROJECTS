import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./Utilities/Loading";
import "./App.css";

const SignIn = lazy(() => import("./Services/SignIn"));
const Attendance = lazy(() => import("./Pages/Attendance"));
const Personal = lazy(() => import("./Pages/Personal"));
const ListSiswa = lazy(() => import("./Pages/List-Siswa"));
const Pelajaran = lazy(() => import("./Pages/Pelajaran"));
const Identity = lazy(() => import("./Pages/Data-Diri"));
const Protected = lazy(() => import("./Components/Protected"));
const queryClient = new QueryClient();

export default function App() {
    return (
        <Suspense fallback={<Loading/>}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/sign-in" element={<SignIn/>}/>
                        <Route path="/attendance" element={<Protected><Attendance/></Protected>}/>
                        <Route path="/" element={<Protected><Personal/></Protected>}/>
                        <Route path="/siswa" element={<Protected><ListSiswa/></Protected>}/>
                        <Route path="/pelajaran" element={<Protected><Pelajaran/></Protected>}/>
                        <Route path="/identity" element={<Protected><Identity/></Protected>}/>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </Suspense>
    )
}
