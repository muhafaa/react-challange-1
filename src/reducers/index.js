import { combineReducers } from 'redux'
import cardReducer from './cardReducer'
import deckReducer from './deckReducer'

const reducers = combineReducers({
  cardReducer,
  deckReducer
})

export default reducers
