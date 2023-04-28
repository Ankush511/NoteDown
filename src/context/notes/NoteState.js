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

        const note = await response.json()
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
        const json = await response.json()

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NGNiOTAxMGJkZTI1NTJkNTc1YjFlIn0sImlhdCI6MTY4MjI0MDYzNH0.OFlf8pZEQoFsbdyomf9_ZV5-7B1VKrqT80vU1aEUaHM',
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json()

        let newNotes = JSON.parse(JSON.stringify(notes));
        // Edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
            
        }
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;