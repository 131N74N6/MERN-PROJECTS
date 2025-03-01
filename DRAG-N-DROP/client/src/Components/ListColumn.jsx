import Card from "./Card";
import "../Styles/ListColumn.css";

export default function ListColumn(props) {
    const handleDropping = (event) => {
        event.preventDefault();
        props.dropHandling(props.categoryCode);
    }

    return (
        <div className="column-content">
            <div className="title">{props.columnTitle}</div>
            <div className="contents" onDrop={handleDropping} onDragOver={(event) => event.preventDefault()}>
                {props.data.map((d, index) => props.categoryCode === d.kategori_id ? (
                    <div key={index}>
                        <Card
                            listId={d.id}
                            activity={d.nama_aktivitas} 
                            eraser={() => props.eraser(d.id)}
                            activeCard={() => props.activeCard(d.id)} 
                            noActive={() => props.activeCard(0)}
                        />
                    </div>
                ) : null)}
            </div>
        </div>
    )
}
