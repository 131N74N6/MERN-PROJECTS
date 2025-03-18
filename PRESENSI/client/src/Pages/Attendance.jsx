import { useState } from "react"

export default function Attendance() {
    const [data, setData] = useState("");

    return (
        <div className="attendance-page">
            <form onSubmit={handleSubmit}>
                <select onChange={selectStatus}>
                    <option value={"Hadir"}>Hadir</option>
                    <option value={"Tidak Hadir"}>Tidak Hadir</option>
                    <option value={"Sakit"}>Sakit</option>
                    <option value={"Izin"}>Izin</option>
                </select>
            </form>
        </div>
    )
}
