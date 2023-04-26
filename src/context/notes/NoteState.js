import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5001"

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NGNiOTAxMGJkZTI1NTJkNTc1YjFlIn0sImlhdCI6MTY4MjI0MDYzNH0.OFlf8pZEQoFsbdyomf9_ZV5-7B1VKrqT80vU1aEUaHM',
            }
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NGNiOTAxMGJkZTI1NTJkNTc1YjFlIn0sImlhdCI6MTY4MjI0MDYzNH0.OFlf8pZEQoFsbdyomf9_ZV5-7B1VKrqT80vU1aEUaHM',
            },
            body: JSON.stringify({ title, description, tag })
        });
        

        const note = {
            "_id": "644675d06581e30030a58815",
            "user": "6444cb9010bde2552d575b1e",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-04-24T12:28:00.006Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NGNiOTAxMGJkZTI1NTJkNTc1YjFlIn0sImlhdCI6MTY4MjI0MDYzNH0.OFlf8pZEQoFsbdyomf9_ZV5-7B1VKrqT80vU1aEUaHM',
            }
        });
        const json = response.json()
        console.log(json)

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NGNiOTAxMGJkZTI1NTJkNTc1YjFlIn0sImlhdCI6MTY4MjI0MDYzNH0.OFlf8pZEQoFsbdyomf9_ZV5-7B1VKrqT80vU1aEUaHM',
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json()
        console.log(json)

        // Edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;