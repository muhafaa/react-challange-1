function getCardList(step) {
  return {
    type: 'FETCH_CARD_LIST',
    payload: {
      step
    }
  }
}

export default getCardList
