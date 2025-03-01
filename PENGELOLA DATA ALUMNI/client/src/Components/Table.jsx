import "./Table.css";
import { Link } from "react-router-dom";

export default function Table({ data, deleteData }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>NAMA</th>
                        <th>JURUSAN/PRODI</th>
                        <th>TAHUN LULUS</th>
                        <th>SETELAN</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((d, index) => (
                        <tr key={index}>
                            <td data-title="NO" className="no">{index + 1}</td>
                            <td data-title="NAMA">{d.nama}</td>
                            <td data-title="PRODI">{d.jurusan_prodi}</td>
                            <td data-title="TAHUN LULUS">{d.tahun_lulus}</td>
                            <td className="controls" data-title="KONTROL">
                                <Link to={`/alumni/${d.id}`}>Detail</Link>
                                <Link to={`/edit-data/${d.id}`}>Ubah</Link>
                                <button type="button" onClick={() => deleteData(d.id)}>Hapus</button>
                            </td>
                        </tr>
                    )) || null}
                </tbody>
            </table>
        </div>
    )
}
