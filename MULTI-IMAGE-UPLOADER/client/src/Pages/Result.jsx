import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import Post from "../Components/Post";
import Loading from "../Components/Loading";
import Header from "../Components/Header";
import "./Result.css";

const Result = () => {
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const keyword = param.get("q");

    const { data: searched, isLoading: isSearchedLoad, error: searchedError } = useQuery({
        queryKey: ["searched-data"],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3602/user-post/search?q=${keyword}`);
            if (request.ok) {
                const response = await request.json();
                return response.data;
            }
            else {
                throw new Error("GAGAL MENAMPILKAN POSTINGAN LAINNYA");
            }
        },
        staleTime: 4000,
        cacheTime: 300000
    });

    return (
        <section className="display-result">
            <header>
                <div>Result for {keyword}</div>
                <Link to={"/home"}>Kembali</Link>
            </header>
            <div className="search-result">
                {searchedError ? <p>{searchedError.message}</p> : isSearchedLoad ? <Loading/> : 
                    searched?.map((search, i) => (
                        <Post data={search} key={`searched-${i+1}`} route={`/post/${search.id}`}/>
                    ))
                }
            </div>
            <Header/>
        </section>
    )
}

export default Result;