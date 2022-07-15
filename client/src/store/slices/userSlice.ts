import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  username: string
}

const initialState: UserState = {
  username: ''
}

const userSlice = createSlice({
  initialState,
  name: 'canvasSlice',
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    }
  }

})

export default userSlice.reducer
export const {setUsername} = userSlice.actions