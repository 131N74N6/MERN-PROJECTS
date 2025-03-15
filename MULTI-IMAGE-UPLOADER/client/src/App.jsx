import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loading from "./Components/Loading";
import Protected from "./Components/Protected";
import "./App.css";

const AddPost = lazy(() => import("./Services/Add-Post"));
const Home = lazy(() => import("./Pages/Home"));
const PostInfo = lazy(() => import("./Pages/Post-Info"));
const SignIn = lazy(() => import("./Services/SignIn"));
const SignUp = lazy(() => import("./Services/SignUp"));
const Personal = lazy(() => import("./Pages/Personal"));
const Result = lazy(() => import("./Pages/Result"));
const Personal_Post_Detail = lazy(() => import("./Pages/Personal-Post-Detail"));

const queryClient = new QueryClient();

const App = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<Loading/>}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Protected><Personal/></Protected>}/>
                            <Route path="/add" element={<Protected><AddPost/></Protected>}/>
                            <Route path="/post/:id" element={<Protected><PostInfo/></Protected>}/>
                            <Route path="/personal/:id" element={<Protected><Personal_Post_Detail/></Protected>}/>
                            <Route path="/home" element={<Protected><Home/></Protected>}/>
                            <Route path="/search" element={<Protected><Result/></Protected>}/>
                            <Route path="/sign-in" element={<SignIn/>}/>
                            <Route path="/sign-up" element={<SignUp/>}/>
                        </Routes>
                    </Router>
                </Suspense>
            </QueryClientProvider>
        </>
    )
}

export default App;