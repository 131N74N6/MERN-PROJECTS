import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Post from '../Components/Post';
import Loading from '../Components/Loading';
import Header from '../Components/Header';
import "./Home.css";

const Home = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const search = useRef();

    const handleSearch = (event) => {
        const keyword = search.current.value;
        event.preventDefault();
        navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
    }
    
    useEffect(() => {
        if (!token) {
            navigate("/sign-in");
        }
    }, [navigate]);

    const { data: allPost, isLoading: allPostIsLoad, error: allPostError } = useQuery({
        queryKey: ["all-post"],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3602/user-post/all-posts`);
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
        <div className="home">
            <header>
                <form onSubmit={handleSearch} title='search-field'>
                    <input type="search" ref={search} name='search' placeholder='cari disini...'/>
                    <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </header>
            <div className="display-post">
                {allPostIsLoad ? <Loading/> : allPostError ? <p>{allPostError.message}</p> : 
                    allPost?.map((all, index) => (
                        <Post key={`all-${index+1}`} data={all} route={`/post/${all.id}`}/>
                    ))
                }
            </div>
            <Header/>
        </div>
    )
}

export default Home;