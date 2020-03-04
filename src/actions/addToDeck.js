function addToDeck(step) {
  return {
    type: 'ADD_DECK',
    payload: {
      step
    }
  }
}

export default addToDeck
