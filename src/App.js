import React, { Component } from 'react'
import axios from 'axios'
import './Main.css'
import './Effect.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Alert } from 'react-bootstrap'
import Loading from './components/Loading'
import SearchForm from './components/SearchForm'
import PageNav from './components/PageNav'
import CardDetail from './views/CardDetail'
import Navigation from './components/partials/Navbar'
import CardPreview from './views/CardPreview'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      yugiCards: [],
      cardDetail: {},
      record: 1,
      limit: 12,
      filter: [],
      errNotFound: null
    }
  }

  componentDidMount() {
    this.getAllCard()
  }

  getAllCard() {
    this.setState({
      yugiCards: []
    })
    axios({
      method: 'GET',
      url: 'https://db.ygoprodeck.com/api/v6/cardinfo.php'
    })
      .then(({ data }) => {
        this.setState({
          showLoading: false,
          yugiCards: data,
          cardDetail: {},
          filter: []
        })
        console.log(this.state.yugiCards[0])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  setCardDetail(value) {
    this.setState({
      cardDetail: value
    })
  }

  searchCard(search) {
    this.setState({
      showLoading: true,
      record: 1,
      limit: 12
    })
    axios({
      method: 'GET',
      url: 'https://db.ygoprodeck.com/api/v6/cardinfo.php?fname=' + search
    })
      .then(({ data }) => {
        this.setState({
          filter: data,
          cardDetail: {},
          showLoading: false
        })
      })
      .catch((err) => {
        this.setState({
          showLoading: false,
          errNotFound: search
        })
        console.log(err)
      })
  }

  reset() {
    this.setState({
      showLoading: true
    })
    setTimeout(() => {
      this.setState({
        filter: [],
        cardDetail: {},
        showLoading: false
      })
    }, 2000)
  }

  cards() {
    const { record, limit, filter } = this.state
    let startPage = limit * record - limit
    let endPage = limit * record
    if (filter.length > 0) {
      return this.state.filter.slice(startPage < 0 ? 0 : startPage, endPage)
    }
    return this.state.yugiCards.slice(startPage < 0 ? 0 : startPage, endPage)
  }

  render() {
    return (
      <>
        <div className="background"></div>
        <Navigation className="p-0 m-0" />
        <Row className="container-fluid mx-auto my-2">
          {!this.state.showLoading ? (
            <>
              <Col sm={12} md={3} className="card p-5 my-3 bg-transparent">
                {(() => {
                  if (this.state.cardDetail.hasOwnProperty('id')) {
                    const { cardDetail } = this.state
                    return (
                      <CardDetail cardDetail={cardDetail} className="my-auto" />
                    )
                  }
                })()}
              </Col>
              <Col
                sm={12}
                md={9}
                className="p-5 my-3 bg-custom-opacity text-white"
              >
                {(() => {
                  if (this.state.errNotFound) {
                    setTimeout(() => {
                      this.setState({
                        errNotFound: null
                      })
                    }, 5000)
                    return (
                      <Alert variant="danger">
                        Card name "<strong>{this.state.errNotFound}</strong>" is
                        not found
                      </Alert>
                    )
                  }
                })()}
                <SearchForm
                  searchCard={(search) => this.searchCard(search)}
                  reset={() => this.reset()}
                />
                <div className="card py-3 bg-info my-3 shadow">
                  <PageNav
                    className="d-flex justify-content-center"
                    record={this.state.record}
                    limit={this.state.limit}
                    next={() =>
                      this.setState({ record: this.state.record + 1 })
                    }
                    prev={() =>
                      this.setState({ record: this.state.record - 1 })
                    }
                    recordLength={(() => {
                      const { yugiCards, filter } = this.state
                      if (filter.length > 0) {
                        return filter.length
                      }
                      return yugiCards.length
                    })()}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <p>
                    Total Card:{' '}
                    <strong>
                      {this.state.filter.length === 0
                        ? this.state.yugiCards.length
                        : this.state.filter.length}{' '}
                      items
                    </strong>
                  </p>

                  <div className="d-flex">
                    <p className="my-auto mr-2">Per Page :</p>
                    <select
                      value={this.state.limit}
                      onChange={(e) => {
                        this.setState({
                          limit: Number(e.target.value)
                        })
                      }}
                      className="custom-select col"
                    >
                      <option value={12}>12</option>
                      <option value={60}>60</option>
                      <option value={120}>100</option>
                    </select>
                  </div>
                </div>
                <Row>
                  {this.cards().map((item) => {
                    return (
                      <CardPreview
                        key={item.id}
                        item={item}
                        setDetail={(item) => this.setCardDetail(item)}
                      />
                    )
                  })}
                </Row>
                <div className="card py-3 bg-info my-3 shadow">
                  <PageNav
                    className="d-flex justify-content-center"
                    record={this.state.record}
                    limit={this.state.limit}
                    next={() =>
                      this.setState({ record: this.state.record + 1 })
                    }
                    prev={() =>
                      this.setState({ record: this.state.record - 1 })
                    }
                    recordLength={(() => {
                      const { yugiCards, filter } = this.state
                      if (filter.length > 0) {
                        return filter.length
                      }
                      return yugiCards.length
                    })()}
                  />
                </div>
              </Col>
            </>
          ) : (
            // Looping buat card nya
            <Loading />
          )}
        </Row>
      </>
    )
  }
}

export default App
