import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SocketState {
  socket: WebSocket | null
  sessionId: string
}

const initialState: SocketState = {
  socket: null,
  sessionId: ''
}

const socketSlice = createSlice({
  initialState,
  name: 'canvasSlice',
  reducers: {
    setSocket: (state, action: PayloadAction<WebSocket>) => {
      state.socket = action.payload
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload
    }
  }

})

export default socketSlice.reducer
export const {setSocket, setSessionId} = socketSlice.actions