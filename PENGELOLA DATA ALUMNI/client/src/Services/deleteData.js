export default function deleteData(id) {
    fetch(`http://localhost:3500/hapus/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        location.reload();
        return response.json();
    })
    .catch((error) => console.log(error));
}
