import { useNavigate } from "react-router-dom"

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <section className="sticky z-50 bottom-0">
            <button type="button" className="w-15 h-15 rounded-[100%] bg-cyan-500 p-1 cursor-pointer" onClick={() => navigate("/personal")}>
                <i className="fa-solid fa-arrow-left text-white"></i>
            </button>
        </section>
    )
}
