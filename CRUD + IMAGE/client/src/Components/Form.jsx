import { memo } from "react";
import { Link } from "react-router-dom";
import "./Form.css";
import "../App.css";

function Form({ 
    nama, inputNama, jenisKelamin, alamat, inputAlamat, inputJenisKelamin, refr, inputGambar, profile, namaAksi, previewGambar, action
}) {
    return (
        <form name="data-user-handling" className="register-form">
            <input placeholder="masukkan nama..." type="text" id="set-name" value={nama} 
            onChange={inputNama} name="nama"/>
            <input placeholder="masukkan alamat..." type="text" id="set-address" value={alamat} 
            onChange={inputAlamat} name="alamat"/>
            <div>
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
            <input type="file" id="set-image" onChange={inputGambar} ref={refr} name="foto"/>
            <div className="file-preview">
                {profile ?
                    <img src={profile} onClick={previewGambar} /> :
                    <div className="symbol" onClick={previewGambar}>Tap here to upload your image</div>
                }
            </div>
            <div className="submit-cancel">
                <button type="submit" onClick={action}>{namaAksi}</button>
                <Link to={"/"}>Kembali</Link>
            </div>
        </form>
    )
}

export default memo(Form);
