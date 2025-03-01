import { memo } from "react";
import ListColumn from "./ListColumn";

function ListField(props) {
    return (
        <div className={props.brightness ? "list-group-dim" : "list-group"}>
            <ListColumn 
                columnTitle="✒️ Baru" 
                data={props.data} 
                eraser={props.eraser} 
                activeCard={props.activeCard} 
                dropHandling={props.dropHandling} 
                categoryCode="L001N"
            />
            <ListColumn 
                columnTitle="⭐ Sedang Dilakukan" 
                data={props.data} 
                eraser={props.eraser} 
                activeCard={props.activeCard} 
                dropHandling={props.dropHandling} 
                categoryCode="L001D"
            />
            <ListColumn 
                columnTitle="☑️ Selesai" 
                data={props.data} 
                eraser={props.eraser} 
                activeCard={props.activeCard} 
                dropHandling={props.dropHandling} 
                categoryCode="L001C"
            />
        </div>
    )
}

export default memo(ListField);
