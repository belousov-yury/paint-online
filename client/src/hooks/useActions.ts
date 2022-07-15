import {AppDispatch} from '../store';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import ActionsCreators from '../store/action-creators'


export const useAppDispatch: () => AppDispatch = useDispatch

export const useActions = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators(ActionsCreators, dispatch)
}