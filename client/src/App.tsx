import React, {useCallback, useEffect} from 'react';
import styles from './styles/app.module.scss'
import ToolBar from './components/ToolBar';
import SettingBar from './components/SettingBar';
import Canvas from './components/Canvas';
import {Routes, Route, Navigate} from 'react-router-dom';
import {useSocket} from './hooks/useSocket';

function App() {
  useSocket()

  return (
    <Routes>
      <Route path='/:id' element={
        <div className={styles.app}>
          <ToolBar/>
          <SettingBar/>
          <Canvas/>
        </div>
      }/>
      <Route path='*' element={<Navigate to={`f${(+new Date()).toString(16)}`}/>}/>
    </Routes>
  );
}

export default App;
