import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        clearMessages: (state) => {
            state.messages = []
        },
        addMessages: (state, action) => {
            state.messages.push(action.payload)
        }
    }
})

export const { setMessages, clearMessages, addMessages } = messageSlice.actions
export default messageSlice.reducer