import React, {FC, useState} from 'react';
import styles from '../styles/toolbar.module.scss';
import Tool from '../tools/Tool';
import Brush from '../tools/Brush';
import {useAppSelector} from '../hooks/useAppSelector';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import {useActions} from '../hooks/useActions';
import {Eraser} from '../tools/Eraser';
import {clearCanvas, saveCanvas} from '../helpers/canvasHelper';

const ToolBar: FC = () => {
  const [selectTool, setSelectTool] = useState<Tool>({} as Tool)
  const canvas = useAppSelector(state => state.canvas.canvas)
  const {socket, sessionId} = useAppSelector(state => state.socket)
  const {setTool, undo, redo} = useActions()

  const downloadImage = () => {
    const dataUrl = canvas.toDataURL()
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = sessionId + '.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearImage = () => {
    if(socket) {
      clearCanvas(canvas)
      socket.send(JSON.stringify({
        id: sessionId,
        method: 'clear'
      }))
      saveCanvas(canvas, sessionId)
    }
  }
  const clickButtonHandler = (tool: Tool) => {
    setSelectTool(tool)
    setTool(tool)
  }

  const undoHandler = () => {
    undo()
  }

  const redoHandler = () => {
    redo()
  }

  return (
    <div className={styles.toolbar}>
      <button className={[styles.toolbar__btn, styles.brush, selectTool.name === 'brush' && styles.active].join(' ')}
              onClick={() => clickButtonHandler(new Brush(canvas, socket || {} as WebSocket, sessionId))}
      />
      <button className={[styles.toolbar__btn, styles.rect, selectTool.name === 'rect' && styles.active].join(' ')}
              onClick={() => clickButtonHandler(new Rect(canvas, socket || {} as WebSocket, sessionId))}
      />
      <button className={[styles.toolbar__btn, styles.circle, selectTool.name === 'circle' && styles.active].join(' ')}
              onClick={() => clickButtonHandler(new Circle(canvas, socket || {} as WebSocket, sessionId))}
      />
      <button className={[styles.toolbar__btn, styles.line, selectTool.name === 'line' && styles.active].join(' ')}
              onClick={() => clickButtonHandler(new Line(canvas, socket || {} as WebSocket, sessionId))}
      />
      <button className={[styles.toolbar__btn, styles.eraser, selectTool.name === 'eraser' && styles.active].join(' ')}
              onClick={() => clickButtonHandler(new Eraser(canvas, socket || {} as WebSocket, sessionId))}
      />

      <button className={[styles.toolbar__btn, styles.undo].join(' ')}
              onClick={undoHandler}
      />
      <button className={[styles.toolbar__btn, styles.redo].join(' ')}
              onClick={redoHandler}
      />
      <button className={[styles.toolbar__btn, styles.clear].join(' ')}
              onClick={clearImage}
      />
      <button className={[styles.toolbar__btn, styles.save].join(' ')}
              onClick={downloadImage}
      />
    </div>
  );
};

export default ToolBar;