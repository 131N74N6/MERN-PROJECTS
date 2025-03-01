import { Link } from "react-router-dom";
import "./Form.css";

export default function Form({
    nama, inputNama, alamat, inputAlamat, jenisKelamin, 
    inputJenisKelamin, prodi, inputProdi, tahunLulus, 
    inputTahunLulus, aksi, namaAksi, judulField
}) {
    return (
        <div className="input-field">
            <form title="input-data-alumni">
                <h3>{judulField}</h3>
                <div>
                    <label htmlFor="nama">Nama</label><br/>
                    <input type="text" id="nama" placeholder="masukkan nama" onChange={inputNama} value={nama} name="nama"/>
                </div>
                <div>
                    <label htmlFor="alamat">Alamat</label><br/>
                    <input type="text" id="alamat" placeholder="masukkan alamat" onChange={inputAlamat} value={alamat} name="alamat"/>
                </div>
                <div>
                    <label htmlFor="prodi">Jurusan/Prodi</label><br/>
                    <input type="text" id="prodi" placeholder="masukkan prodi" onChange={inputProdi} value={prodi} name="jurusan_prodi"/>
                </div>
                <div className="gender">
                    <div>Jenis Kelamin : </div>
                    <input 
                        type="radio" id="laki" name="jenis_kelamin" onChange={inputJenisKelamin} 
                        value="Laki-Laki" checked={jenisKelamin === 'Laki-Laki'}
                    />
                    <label htmlFor="laki">Laki-Laki</label>
                    <input 
                        type="radio" name="jenis_kelamin" id="perempuan" onChange={inputJenisKelamin} 
                        value="Perempuan" checked={jenisKelamin === 'Perempuan'}
                    />
                    <label htmlFor="perempuan">Perempuan</label>
                </div>
                <div>
                    <label htmlFor="tahun-lulus">Tahun Lulus</label><br/>
                    <input type="text" id="tahun-lulus" placeholder="masukkan tahun lulus" onChange={inputTahunLulus} value={tahunLulus} name="tahun_lulus"/>
                </div>
                <button type="submit" onClick={aksi}>{namaAksi}</button>
                <Link to={"/"}>Kembali</Link>
            </form>
        </div>
    )
}
