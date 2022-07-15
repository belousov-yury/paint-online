import {createSlice} from '@reduxjs/toolkit';
import Tool from '../../tools/Tool';


interface ToolState {
  tool: Tool | null
}

const initialState: ToolState = {
  tool: null
}

const toolSlice = createSlice({
  initialState,
  name: 'toolSlice',
  reducers: {
    setTool: (state, action) => {
      state.tool = action.payload
    },
    setFillColor: (state, action) => {
      if (state.tool) state.tool.fillColor = action.payload
    },
    setStrokeColor: (state, action) => {
      if (state.tool) state.tool.strokeColor = action.payload
    },
    setLineWidth: (state, action) => {
      if (state.tool) state.tool.lineWidth = action.payload
    }
  }
})

export default toolSlice.reducer
export const {setTool, setStrokeColor, setFillColor, setLineWidth} = toolSlice.actions