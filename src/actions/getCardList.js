import axios from 'axios'
function getCardList() {
  return (dispatch, getState) => {
    dispatch({
      type: 'ON_FETCHING'
    })
    return axios
      .get('https://db.ygoprodeck.com/api/v6/cardinfo.php')
      .then(({ data }) => {
        const cards = data
        return dispatch({
          type: 'FETCH_CARD_LIST',
          payload: {
            cards
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

export default getCardList
