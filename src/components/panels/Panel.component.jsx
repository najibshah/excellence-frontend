import { useState } from "react";
import Divider from "@mui/material/Divider";
import { Droppable } from "react-beautiful-dnd";
import { NewItemModal, TaskCard } from ".";

export function Panel({ columnId, column, boardID, refresh, setRefresh }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: 8,
        }}
      >
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "lightblue" : "#ECEBF3",
                  padding: 4,
                  width: 250,
                  minHeight: 150,
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2>{column.name}</h2>

                <Divider
                  color="#000000"
                  sx={{
                    width: "100%",
                    mb: 3,
                  }}
                />
                {column.items.map((item, index) => {
                  return (
                    <TaskCard
                      key={item.id}
                      item={item}
                      index={index}
                    ></TaskCard>
                  );
                })}
                {provided.placeholder}

                <h5
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={handleOpen}
                >
                  + Add Item
                </h5>
              </div>
            );
          }}
        </Droppable>
      </div>

      <NewItemModal
        open={open}
        setOpen={setOpen}
        refresh={refresh}
        setRefresh={setRefresh}
        boardID={boardID}
        panelID={columnId}
      />
    </div>
  );
}
