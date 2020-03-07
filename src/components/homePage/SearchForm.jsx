import React, { useState } from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

function SearchForm({ searchCard, reset }) {
  const [search, setSearch] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    searchCard(search)
  }

  return (
    <form onSubmit={submit} data-testid="search-form">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by card's name"
          id="search-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <InputGroup.Append>
          <InputGroup.Text
            as="button"
            type="submit"
            className="btn btn-outline-success"
          >
            Search
          </InputGroup.Text>
        </InputGroup.Append>
        <InputGroup.Append>
          <InputGroup.Text
            as="button"
            type="reset"
            className="btn btn-outline-danger"
            onClick={() => reset()}
          >
            Reset
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </form>
  )
}

export default SearchForm
