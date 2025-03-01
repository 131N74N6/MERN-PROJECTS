import { memo } from "react";
import { Link } from "react-router-dom";
import "./ShowData.css";

function ShowData({ data, deleteData }) {
    return (
        <div className="submitted-data">
            <div className="show-data">
                {data.map((dt, index) => (
                    <div key={`data-${index}`} className="data-id">
                        <div className="img-container">
                            <img src={`http://localhost:3601/uploads/${dt.foto}`} alt={dt.nama} />
                        </div>
                        <p>nama : {dt.nama}</p>
                        <p>jenis kelamin : {dt.jenis_kelamin}</p>
                        <p>alamat : {dt.alamat}</p>
                        <div className="data-handler">
                            <Link to={`/select/${dt.id}`}>Select</Link>
                            <button type="button" onClick={() => deleteData(dt.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(ShowData);