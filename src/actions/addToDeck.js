function addToDeck(card) {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_DECK',
      payload: {
        card
      }
    })
  }
}

export default addToDeck
