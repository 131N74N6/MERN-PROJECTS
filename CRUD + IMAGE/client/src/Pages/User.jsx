import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import ShowData from "../Components/ShowData";
import ErrorPage from "./ErrorPage";
import Loading from "../Components/Loading";
import Control from "../Components/Control";
import Pagination from "../Components/Pagination";

export default function User() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);

    const { data: userData, isLoading, error } = useQuery({
        queryKey: [`user-data-${page}`],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3601/users-data/?page=${encodeURIComponent(page)}`, { method: "GET" });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("gagal mendapatkan data karena koneksi internet terputus");
            }
        },
        staleTime: 4000,
        cacheTime: 0,
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
        onSuccess: () => { queryClient.invalidateQueries([`user-data-${page}`]) }
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
        onSuccess: () => { queryClient.invalidateQueries([`user-data-${page}`]) }
    });

    const deleteData = useCallback( async (id) => {
        removeMutation.mutate(id);
    }, [userData]);

    const deleteAllData = useCallback( async () => {
        removeAllMutation.mutate();
    }, [userData]);

    return (
        <div className="user">
            <div className="user-list">
                <Control deleteAllData={deleteAllData} />
                {error ? <ErrorPage text={error}/> : isLoading ? <Loading/> : 
                    <>
                        <Pagination currentPage={page} totalPage={userData?.total_halaman} setPage={setPage} />
                        <ShowData data={userData?.data} deleteData={deleteData} />
                    </>
                }
            </div>
        </div>
    )
}
