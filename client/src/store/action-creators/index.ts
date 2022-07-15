import * as toolActions from '../slices/toolSlice'
import * as canvasActions from '../slices/canvasSlice'
import * as userActions from '../slices/userSlice'
import * as errorActions from '../slices/errorSlice'
import * as socketActions from '../slices/socketSlice'

const actions =  {
  ...toolActions,
  ...canvasActions,
  ...userActions,
  ...errorActions,
  ...socketActions
}

export default actions