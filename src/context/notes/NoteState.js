import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "644667984c4a05be413f7f1d",
          "user": "6444cb9010bde2552d575b1e",
          "title": "New Note",
          "description": "Please access the playlist",
          "tag": "Youtube",
          "date": "2023-04-24T11:27:20.853Z",
          "__v": 0
        },
        {
          "_id": "644675d06581e30030a58875",
          "user": "6444cb9010bde2552d575b1e",
          "title": "My personal Note",
          "description": "Watch one piece and demon slayer",
          "tag": "animesuge",
          "date": "2023-04-24T12:28:00.006Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value={{notes , setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;