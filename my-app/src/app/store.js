

import { compose, configureStore, createStore } from '@reduxjs/toolkit';
import guessReducer from '../features/guessSlice';
import gameReducer from "../features/gameSlice"
import socketSlice from "../features/socketSlice"
import messageSlice from '../features/messageSlice';
import socketIO from 'socket.io-client';
import socketIoMiddleware from 'redux-socket.io-middleware'
import { applyMiddleware, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const io = socketIO.connect(`http://localhost:8000`);


const asyncDispatchMiddleware = store => next => action => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch =
      Object.assign({}, action, { asyncDispatch });

  next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();
};
export const store = configureStore({
  reducer: {
    guess: guessReducer,
    game: gameReducer,
    socket: socketSlice,
    message: messageSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([socketIoMiddleware(io), asyncDispatchMiddleware]),
  
});

