import canvasSlice from './slices/canvasSlice';
import toolSlice from './slices/toolSlice';
import userSlice from './slices/userSlice';
import errorSlice from './slices/errorSlice';
import socketSlice from './slices/socketSlice';

export const rootReducer = {
  canvas: canvasSlice,
  tool: toolSlice,
  user: userSlice,
  error: errorSlice,
  socket: socketSlice
}