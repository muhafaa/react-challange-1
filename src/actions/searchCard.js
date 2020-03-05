import axios from 'axios'
function searchCard(search) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      resolve(
        dispatch({
          type: 'ON_FETCHING'
        })
      )
    })
      .then(() => {
        return axios({
          method: 'GET',
          url: 'https://db.ygoprodeck.com/api/v6/cardinfo.php?fname=' + search
        })
          .then(({ data }) => {
            const filteredCard = data
            return dispatch({
              type: 'FILTER_CARD',
              payload: {
                filter: filteredCard
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
              type: 'FILTER_ERROR',
              payload: {
                errNotFound: search
              }
            })
            console.log(err)
          })
      })
      .catch((err) => {})
  }
}

export default searchCard
