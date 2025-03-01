import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import ShowData from "../Components/ShowData";
import { useCallback, useState } from "react";
import ErrorPage from "./ErrorPage";
import Loading from "../Components/Loading";
import Control from "../Components/Control";

export default function SearchPage() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search);
    const show = keyword.get("s");

    const queryClient = useQueryClient();

    const { data: userData, isLoading, error } = useQuery({
        queryKey: [`user-data-${show}`],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3601/users-data/search?s=${show}`, { method: "GET" });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("gagal mendapatkan data karena koneksi internet terputus");
            }
        },
        staleTime: 4000,
        cacheTime: 1000,
        refetchOnWindowFocus: false,
        refetchInterval: false
    });

    const removeMutation = useMutation({
        mutationFn: async (id) => {
            const request = await fetch(`http://localhost:3601/users-data/delete/${id}`, {
                method: "DELETE",
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("gagal menghapus salah satu data karena koneksi internet terputus");
            }
        },
        onSuccess: () => { queryClient.invalidateQueries([`user-data-${show}`]) }
    });

    const removeAllMutation = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:3601/users-data/delete-all`, {
                method: "DELETE",
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("gagal menghapus semua data karena koneksi internet terputus");
            }
        },
        onSuccess: () => { queryClient.invalidateQueries([`user-data-${show}`]) }
    });

    const deleteData = useCallback( async (id) => {
        removeMutation.mutate(id);
    }, []);

    const deleteAllData = useCallback( async () => {
        removeAllMutation.mutate();
    }, []);

    return (
        <div className="user">
            <div className="users-list">
                <Control deleteAllData={deleteAllData} />
                {error ? <ErrorPage text={error}/> : isLoading ? <Loading/> : 
                    <>
                        <ShowData data={userData?.data} deleteData={deleteData} />
                    </>
                }
            </div>
        </div>
    )
}
