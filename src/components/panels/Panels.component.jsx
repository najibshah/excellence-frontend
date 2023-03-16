import { useState } from "react";
import { onDragEnd } from "../../functions/onDragEnd.function";
import { NewPanelModal, Panel } from ".";
import { DragDropContext } from "react-beautiful-dnd";

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
            <Panel
              key={columnId}
              columnId={columnId}
              column={column}
              boardID={boardID}
              refresh={refresh}
              setRefresh={setRefresh}
            ></Panel>
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
        + Add Panel
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
