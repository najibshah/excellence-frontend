import axios from "axios";
import { useState } from "react";

const apiURI = process.env.REACT_APP_API_URI;

export function EditBoard({ boardID, boardName, setRefresh, refresh }) {
  const [errors, setErrors] = useState();
  const editData = {
    boardLabel: boardName,
    boardID: boardID,
  };
  axios
    .post(`${apiURI}/edc/boards/addBoard`, editData)
    .then((response) => {
      console.log(response);
      setRefresh(!refresh);
    })
    .catch((response) => {
      console.log("error in axios login call react");
      setErrors({});
      setErrors(response.response.data);
    });
  // eslint-disable-next-line no-console

  errors && console.log({ errors });
}
