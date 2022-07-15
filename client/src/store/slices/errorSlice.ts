import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IError} from '../../interfaces/IError';

export interface ErrorState {
  message: string
  isShow: boolean
}

const initialState: ErrorState = {
  message: '',
  isShow: false
}

const errorSlice = createSlice({
  initialState,
  name: 'canvasSlice',
  reducers: {
    setError: (state, action: PayloadAction<IError>) => {
      if(action.payload?.message) {
        state.message = action.payload.message
      }
      state.isShow = action.payload.isShow
    }
  }

})

export default errorSlice.reducer
export const {setError} = errorSlice.actions