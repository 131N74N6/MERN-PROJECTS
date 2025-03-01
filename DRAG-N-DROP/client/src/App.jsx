import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToDoList from "./Pages/ToDoList";

const queryClient = new QueryClient;

export default function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ToDoList/>
            </QueryClientProvider>
        </>
    )
}
