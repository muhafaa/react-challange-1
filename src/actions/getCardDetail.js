import axios from 'axios'
function getCardDetail(cardId) {
  return (dispatch, getState) => {
    dispatch({
      type: 'ON_FETCHING'
    })
    return axios
      .get('https://db.ygoprodeck.com/api/v6/cardinfo.php', {
        params: {
          id: cardId
        }
      })
      .then(({ data }) => {
        const card = data[0]
        return dispatch({
          type: 'FETCH_CARD_DETAIL',
          payload: {
            card
          }
        })
      })
      .then(() => {
        dispatch({
          type: 'FETCH_DONE'
        })
      })
      .catch((err) => {
        dispatch({
          type: 'FETCH_DONE'
        })
        console.log(err)
      })
  }
}

export default getCardDetail
