import "../Styles/Card.css";

export default function Card(props) {
    return (
        <div className="card-frame" draggable onDragStart={props.activeCard} onDragEnd={props.noActive} key={props.listId}>
            <div className="keterangan">
                <div className="nama">{props.activity}</div>
            </div>
            <button type="button" onClick={props.eraser}>x</button>
        </div>
    )
}
