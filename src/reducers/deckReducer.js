const initialState = {
  deckList: []
}

function deckReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_DECK':
      return { ...state, deckList: [...state.deckList, action.payload.card.id] }

    default:
      return state
  }
}

export default deckReducer
