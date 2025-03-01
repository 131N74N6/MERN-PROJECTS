import "../Styles/DropArea.css";

export default function DropArea(props) {
    const handleDropping = (event) => {
        event.preventDefault()
        props.dropHandling(props.categoryCode);
        props.setIsShowDrop(false);
    }

    return (
        <div 
            className={props.isShowDrop ? "drop-area" : "drop-area-disabled"} 
            onDragEnter={props.visibilityOn} 
            onDragLeave={props.visibilityOff} 
            onDrop={handleDropping} 
            onDragOver={(event) => event.preventDefault()}
        >
            Drop Here
        </div>
    )
}
