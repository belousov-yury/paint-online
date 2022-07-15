import {useAppSelector} from './useAppSelector';
import {useEffect} from 'react';
import {clearCanvas, drawHandler} from '../helpers/canvasHelper';

export const useSocket = () => {
  const {socket, sessionId} = useAppSelector(state => state.socket)
  const username = useAppSelector(state => state.user.username)
  const canvas = useAppSelector(state => state.canvas.canvas)

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: sessionId,
          method: 'connection',
          username
        }))
      }
      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        switch (msg.method) {
          case 'connection':
            console.log(`Пользователь ${msg.username} присоединился`)
            break
          case 'draw':
            drawHandler(msg, canvas)
            break
          case 'clear': {
            clearCanvas(canvas)
            break
          }
        }
      }
    }
  }, [socket, sessionId, username])

}