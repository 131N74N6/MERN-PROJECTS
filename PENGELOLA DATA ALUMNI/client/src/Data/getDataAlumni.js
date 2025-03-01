export default async function getDataAlumni(API_LINK) {
    const fecthing = await fetch(API_LINK);
    if (fecthing.ok) {
        const response = await fecthing.json();
        const dbData = response;
        return dbData;
    }
    else {
        return "Cek Koneksi Anda";
    }
}
