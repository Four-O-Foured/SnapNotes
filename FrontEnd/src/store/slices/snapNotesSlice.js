import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snapNotes: [],
    currentSnapNote: null,
};

const snapNotesSlice = createSlice({
    name: 'snapNotes',
    initialState,
    reducers: {
        setSnapNotes: (state, action) => {
            state.snapNotes = action.payload;
        },
        addSnapNote: (state, action) => {
            state.snapNotes.push(action.payload);
        },
        setCurrentSnapNote: (state, action) => {
            state.currentSnapNote = action.payload;
        },
    },
});

export const { setSnapNotes, addSnapNote, setCurrentSnapNote } = snapNotesSlice.actions;
export default snapNotesSlice.reducer;
