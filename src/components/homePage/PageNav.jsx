import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'

function PageNav({ record, limit, recordLength, next, prev }) {
  const [nextDisabled, setDisableNext] = useState(false)
  const [prevDisabled, setDisablePrev] = useState(false)

  useEffect(() => {
    if (record === 1) {
      setDisablePrev(true)
    }
    if (limit * record >= recordLength) {
      setDisableNext(true)
    }
    if (record > 1 && limit * record < recordLength) {
      setDisablePrev(false)
      setDisableNext(false)
    }
  }, [record, limit, recordLength])

  return (
    <Pagination className="mx-auto m-0" data-testid="page-nav">
      <Pagination.Prev
        className="font-weight-bold mr-5"
        onClick={() => prev()}
        disabled={prevDisabled}
        style={{ cursor: prevDisabled ? 'not-allowed' : 'pointer' }}
      >
        Prev
      </Pagination.Prev>
      <Pagination.Next
        className="font-weight-bold"
        onClick={() => next()}
        disabled={nextDisabled}
        style={{ cursor: nextDisabled ? 'not-allowed' : 'pointer' }}
      >
        Next
      </Pagination.Next>
    </Pagination>
  )
}

export default PageNav
