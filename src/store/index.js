import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import { setStore } from 'wepy-redux'
import rootReducer from './reducers'

function configStore () {
  const store = createStore(rootReducer, applyMiddleware(promiseMiddleware))
  return store
}

const store = configStore()
setStore(store)
export default store
