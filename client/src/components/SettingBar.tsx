import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import styles from '../styles/setting.module.scss'
import {useActions} from '../hooks/useActions';
import {useAppSelector} from '../hooks/useAppSelector';

const SettingBar:FC = () => {
  const [selectedFillColor, setSelectedFillColor] = useState<string>('#000000')
  const [selectedStrokeColor, setSelectedStrokeColor] = useState<string>('#000000')
  const {setLineWidth, setStrokeColor, setFillColor} = useActions()

  const tool = useAppSelector(state => state.tool.tool)

  const changeLineWidth = (e: ChangeEvent) => {
    setLineWidth((e.target as HTMLInputElement).value)
  }

  const changeStrokeColor = (e: ChangeEvent) => {
    setSelectedStrokeColor((e.target as HTMLInputElement).value)
  }

  const changeFillColor = (e: ChangeEvent) => {
    setSelectedFillColor((e.target as HTMLInputElement).value)
  }

  useEffect(()=> {
    setFillColor(selectedFillColor)
    setStrokeColor(selectedStrokeColor)
  }, [tool, selectedFillColor, selectedStrokeColor, setFillColor, setStrokeColor])

  return (
    <div className={styles.setting}>
      <label htmlFor='line-width'>Толщина линии</label>
      <input id='line-width'
             type='number'
             defaultValue={1} min={1} max={50}
             onChange={changeLineWidth}
      />
      <label htmlFor='stroke-color'>Цвет линии</label>
      <input id='stroke-color'
             type='color'
             value={selectedStrokeColor}
             onChange={changeStrokeColor}
      />
      <label htmlFor='fill-color'>Цвет заливки</label>
      <input id='fill-color'
             type='color'
             value={selectedFillColor}
             onChange={changeFillColor}
      />
    </div>
  );
};

export default SettingBar;