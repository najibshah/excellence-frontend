import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Divider from "@mui/material/Divider";
import { onDragEnd } from "../../functions/onDragEnd.function";
import { AddButton } from "./AddButton.component";
import { NewPanelModal } from ".";

export function Panels({ panels, boardID, refresh, setRefresh }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [columns, setColumns] = useState(panels);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        marginTop: "30px",
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 150,
                          borderRadius: "15px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <h2>{column.name}</h2>
                        <Divider
                          color="#000000"
                          sx={{ width: "100%", mb: 3 }}
                        />
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
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
                                      borderRadius: "10px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#2a2b2a"
                                        : "#706c61",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}

                        <AddButton title="Add Item" />
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>

      <h5
        style={{
          marginLeft: "60px",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        Add Panel
      </h5>
      <NewPanelModal
        open={open}
        setOpen={setOpen}
        refresh={refresh}
        setRefresh={setRefresh}
        boardID={boardID}
      />
    </div>
  );
}
