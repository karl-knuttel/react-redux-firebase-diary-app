import { GET_NOTES, NOTES_STATUS } from '../actionTypes';
import { database } from '../firebase';

export function getNotes() {
    return dispatch => {
        // As soon as component mounts show loading as true
        dispatch({
            type: NOTES_STATUS,
            payload: true
        });
        database.on('value', snapshot => {
            dispatch({
                type: GET_NOTES,
                payload: snapshot.val()
            });
            // As soon as component mounts show loading as true
            dispatch({
                type: NOTES_STATUS,
                payload: false
            });
            // wait until something changed and then try again
        },
        () => {
            dispatch({
                type: NOTES_STATUS,
                payload: -1
            })
        });
    }
}

export function saveNote(note) {
    return dispatch => database.push(note);
}

export function editNote(id, note) {
    return dispatch => database.child(id).update(note);
}

export function deleteNote(id) {
    return dispatch => database.child(id).remove();
}

export function saveComment(noteId, comment) {
    return dispatch => {
        database.child(noteId).child('comments').push(comment);
    }
}