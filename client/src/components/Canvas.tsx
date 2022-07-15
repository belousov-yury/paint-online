import React, {FC, useEffect, useRef} from 'react';
import styles from '../styles/canvas.module.scss'
import {useActions} from '../hooks/useActions';
import Login from './Login';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {clearCanvas, saveCanvas} from '../helpers/canvasHelper';

const Canvas: FC = () => {
  const {id} = useParams()
  const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement)

  const {setCanvas, pushToUndo} = useActions()

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current)
      axios.get(`${process.env.REACT_APP_SERVER_URL}/image?id=${id}`)
        .then(res => {
          const img = new Image()
          const ctx = canvasRef.current?.getContext('2d')
          img.src = res.data
          img.onload = () => {
            clearCanvas(canvasRef.current)
            ctx?.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
          }
        })
    }
  }, [setCanvas])

  const mouseDownHandler = () => {
    const img = canvasRef.current?.toDataURL()
    img && pushToUndo(img)
  }

  const mouseUpHandler = () => {
    if(id) saveCanvas(canvasRef.current, id)
  }

  return (
    <div className={styles.canvas}>
      <Login/>
      <canvas width={600}
              height={400}
              ref={canvasRef}
              onMouseDown={mouseDownHandler}
              onMouseUp={mouseUpHandler}
      />
    </div>
  );
};

export default Canvas;