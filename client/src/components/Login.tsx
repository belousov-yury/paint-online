import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Alert, Button, Modal} from 'react-bootstrap';
import {useAppSelector} from '../hooks/useAppSelector';
import {useActions} from '../hooks/useActions';
import styles from '../styles/login.module.scss'
import {useParams} from 'react-router-dom';

const Login: FC = () => {
  const [usernameCurrent, setUsernameCurrent] = useState<string>('')
  const error = useAppSelector(state => state.error)
  const [show, setShow] = useState<boolean>(true)
  const {setError, setUsername} = useActions()
  const {id} = useParams()
  const username = useAppSelector(state => state.user.username)
  const {setSocket, setSessionId} = useActions()


  useEffect(() => {
    if (username) {
      const ws = new WebSocket(process.env.REACT_APP_WS_URL as string)
      setSocket(ws)
      setSessionId(id as string)
    }
  }, [username, id])


  const changeUsername = (e: ChangeEvent) => {
    setUsernameCurrent((e.target as HTMLInputElement).value)
  }

  const connectionHandler = () => {
    if (!usernameCurrent) {
      setError({message: 'Введите имя', isShow: true})
    } else {
      setShow(false)
      setUsername(usernameCurrent)
    }
  }

  useEffect(() => {
    if (usernameCurrent) {
      setError({isShow: false})
    }
  }, [usernameCurrent, setError])


  return (
    <>

      <Modal show={show} onHide={() => {
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text'
                 value={usernameCurrent}
                 onChange={changeUsername}
                 className={error.isShow ? styles.error : ''}
          />
          {error.isShow &&
            <Alert variant='danger'
                   className={styles.alert}
            >
              {error.message}
            </Alert>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={connectionHandler}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;