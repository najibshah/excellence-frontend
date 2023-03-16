import { Draggable } from "react-beautiful-dnd";
import Grid from "@mui/material/Grid";
import { createDate } from "../../functions/createDate.function";

export function TaskCard({ item, index }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              width: "90%",
              userSelect: "none",
              padding: 16,
              margin: "0 0 8px 0",
              minHeight: "50px",
              borderRadius: "5px",
              backgroundColor: snapshot.isDragging ? "#2a2b2a" : "#BFCDE0",
              color: snapshot.isDragging ? "white" : "black",
              ...provided.draggableProps.style,
            }}
          >
            {item.content} <br />
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{
                mt: 2,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  marginBottom: "5px",
                }}
              >
                <b>Date Added:</b> <br />
                {createDate(item.dateAdded)}
              </span>
              <span
                style={{
                  fontSize: "10px",
                }}
              >
                <b>Date Modified:</b> <br />
                {createDate(item.dateAdded)}
              </span>
            </Grid>
          </div>
        );
      }}
    </Draggable>
  );
}
