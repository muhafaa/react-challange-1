function resetList() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      resolve(
        dispatch({
          type: 'ON_FETCHING'
        })
      )
    })
      .then(() => {
        return dispatch({
          type: 'RESET_FILTER'
        })
      })
      .then(() => {
        setTimeout(() => {
          dispatch({
            type: 'FETCH_DONE'
          })
        }, 2000)
      })
      .catch((err) => {
        dispatch({
          type: 'FETCH_DONE'
        })
        console.log(err)
      })
  }
}

export default resetList
