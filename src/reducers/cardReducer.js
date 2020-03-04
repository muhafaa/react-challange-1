const initialState = {
  cardList: []
}

function cardReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CARD_LIST':
      return { ...state, cardList: action.payload.step }

    default:
      return state
  }
}

export default cardReducer
