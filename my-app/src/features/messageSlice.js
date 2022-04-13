import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: []
}

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
      setMessages: (state, action) => {
        state.messages.push({message: action.message, name: action.sender})
      }

  }
});

export const {setMessages} = messageSlice.actions

export default messageSlice.reducer