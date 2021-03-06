import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import customLogger from '../middlewares'

import reducers from '../reducers'

const middleware = applyMiddleware(thunk, customLogger)

const store = createStore(reducers, middleware)

export default store
