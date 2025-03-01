import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./Pages/Home";
import PostInfo from "./Pages/Post-Info";
import AddPost from "./Pages/Add-Post";
import "./App.css";

const queryQlient = new QueryClient();

const App = () => {
    return (
        <>
            <QueryClientProvider client={queryQlient}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/add" element={<AddPost/>}/>
                        <Route path="/post/:id" element={<PostInfo/>}/>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    )
}

export default App;