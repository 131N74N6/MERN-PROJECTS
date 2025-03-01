import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Pages/User";
import Edit from "./Pages/Edit";
import Add from "./Pages/Add";
import SearchPage from "./Pages/SearchPage";
import "./App.css";

export default function App() {
    const queryQlient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryQlient}>
                <Router>
                    <Routes>
                        <Route path="/" element={<User/>}/>
                        <Route path="/add-data" element={<Add/>}/>
                        <Route path="/select/:id" element={<Edit/>}/>
                        <Route path="/search" element={<SearchPage/>}/>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    )
}
