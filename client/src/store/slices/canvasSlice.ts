import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearCanvas} from '../../helpers/canvasHelper';

interface CanvasState {
  canvas: HTMLCanvasElement
  undoList: string[]
  redoList: string[]
}

const initialState: CanvasState = {
  canvas: {} as HTMLCanvasElement,
  redoList: [],
  undoList: []
}

const canvasSlice = createSlice({
  initialState,
  name: 'canvasSlice',
  reducers: {
    setCanvas: (state, action) => {
      state.canvas = action.payload
    },
    pushToUndo: (state, action: PayloadAction<string>) => {
      state.undoList.push(action.payload)
    },
    popToUndo: (state) => {
      state.undoList.pop()
    },
    pushToRedo: (state, action) => {
      // state.redoList.push(action.payload)
    },
    undo: state => {
      if (state.undoList.length) {
        const canvas = state.canvas
        const ctx = canvas.getContext('2d')
        const dataUrl = state.undoList.pop()
        if (dataUrl) {
          state.redoList.push(canvas.toDataURL())
          const img = new Image()
          img.src = dataUrl
          img.onload = () => {
            clearCanvas(canvas as HTMLCanvasElement)
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
          }
        }
      } else {
        clearCanvas(state.canvas as HTMLCanvasElement)
      }
    },
    redo: state => {
      if (state.redoList.length) {
        const canvas = state.canvas
        const ctx = canvas.getContext('2d')
        const dataUrl = state.redoList.pop()
        if (dataUrl) {
          state.undoList.push(canvas.toDataURL())
          const img = new Image()
          img.src = dataUrl
          img.onload = () => {
            clearCanvas(canvas as HTMLCanvasElement)
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
          }
        }
      }
    }
  }
})

export default canvasSlice.reducer
export const {setCanvas, pushToUndo, pushToRedo, undo, redo} = canvasSlice.actions