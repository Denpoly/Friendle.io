import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    gameState: "home",
}

const gameSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setGameState: (state,action) => {
        state.gameState = action.payload
    },

  }
});

export const {setGameState} = gameSlice.actions

export default gameSlice.reducer