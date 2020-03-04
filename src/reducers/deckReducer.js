const initialState = {
  deckList: []
}

function deckReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_DECK':
      let decks = state.deckList
      decks.push(action.payload.step)
      return { ...state, decks: decks }

    default:
      return state
  }
}

export default deckReducer
