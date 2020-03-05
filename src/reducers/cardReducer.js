const initialState = {
  cardList: [],
  filter: [],
  errNotFound: null,
  loading: false
}

function cardReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CARD_LIST':
      return { ...state, cardList: action.payload.cards }

    case 'FILTER_CARD':
      return { ...state, filter: action.payload.filter }

    case 'FILTER_ERROR':
      return {
        ...state,
        errNotFound: action.payload.errNotFound,
        loading: false
      }

    case 'RESET_FILTER':
      return { ...state, filter: [] }

    case 'RESET_ERROR':
      return { ...state, errNotFound: null }

    case 'ON_FETCHING':
      return { ...state, loading: true }

    case 'FETCH_DONE':
      return { ...state, loading: false }

    default:
      return state
  }
}

export default cardReducer
