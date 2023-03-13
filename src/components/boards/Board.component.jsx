import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as uuid from "uuid";
import axios from "axios";
import Divider from "@mui/material/Divider";

const apiURI = process.env.REACT_APP_API_URI;

const itemsFromBackend = [
  { id: uuid.v4(), content: "First task" },
  { id: uuid.v4(), content: "Second task" },
  { id: uuid.v4(), content: "Third task" },
  { id: uuid.v4(), content: "Fourth task" },
  { id: uuid.v4(), content: "Fifth task" },
];
const columnsFromBackend = {
  [uuid.v4()]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  [uuid.v4()]: {
    name: "To do",
    items: [],
  },
  [uuid.v4()]: {
    name: "In Progress",
    items: [],
  },
  [uuid.v4()]: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export function Board({ children, value, index, ...other }) {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [errors, setErrors] = useState();
  const [refresh, setRefresh] = useState(false);
  console.log({ index });

  // useEffect(() => {
  //   axios
  //     .get(`${apiURI}/edc/panels/all`)
  //     .then((response) => {
  //       setColumns(response.data);
  //     })

  //     .catch((response) => {
  //       console.log("error in axios form call react");
  //       setErrors({});
  //       setErrors(response.response.data);
  //     });
  //   // eslint-disable-next-line no-console
  // }, [refresh]);

  console.log({ errors });

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
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
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

// export function Board(props) {

//   // const { children, value, index, ...other } = props;

//   // return (
//   //   <div
//   //     role="tabpanel"
//   //     hidden={value !== index}
//   //     id={`simple-tabpanel-${index}`}
//   //     aria-labelledby={`simple-tab-${index}`}
//   //     {...other}
//   //   >
//   //     {value === index && (
//   //       <Box sx={{ p: 3 }}>
//   //         <Typography>{children}</Typography>
//   //       </Box>
//   //     )}
//   //   </div>
//   // );
// }
