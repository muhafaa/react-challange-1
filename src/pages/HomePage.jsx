import React, { Component } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// actions
import getCardList from '../actions/getCardList'
import searchCard from '../actions/searchCard'
import resetList from '../actions/resetList'
import resetError from '../actions/resetError'

// Components
import Loading from '../components/Loading'
import SearchForm from '../components/homePage/SearchForm'
import PageNav from '../components/homePage/PageNav'
import CardDetail from '../components/CardDetail'
import CardPreview from '../components/CardPreview'
import Misc from '../components/homePage/Misc'

const mapStateToProps = (state) => {
  return {
    cardList: state.cardReducer.cardList,
    loading: state.cardReducer.loading,
    filter: state.cardReducer.filter,
    errNotFound: state.cardReducer.errNotFound
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCardList: () => dispatch(getCardList()),
    searchCard: (search) => dispatch(searchCard(search)),
    resetFilter: () => dispatch(resetList()),
    resetError: () => dispatch(resetError())
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardDetail: {},
      record: 1,
      limit: 12
    }
  }

  componentDidMount() {
    this.getAllCard()
  }

  getAllCard() {
    const { getCardList } = this.props
    getCardList()
    this.setState({
      cardDetail: {},
      filter: []
    })
  }

  setCardDetail(value) {
    this.setState({
      cardDetail: value
    })
  }

  searchCard(search) {
    const { searchCard } = this.props
    this.setState({
      record: 1,
      limit: 12
    })
    searchCard(search)
  }

  reset() {
    const { resetFilter } = this.props
    resetFilter()
  }

  cards() {
    const { record, limit } = this.state
    const { filter, cardList } = this.props
    let startPage = limit * record - limit
    let endPage = limit * record
    if (filter.length > 0) {
      return filter.slice(startPage < 0 ? 0 : startPage, endPage)
    }
    return cardList.slice(startPage < 0 ? 0 : startPage, endPage)
  }

  render() {
    return (
      <Row className="container-fluid mx-auto my-2">
        {!this.props.loading ? (
          <>
            <Col
              sm={12}
              md={3}
              className="card p-5 my-3 bg-transparent"
              data-testid="homepage"
            >
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
                const { errNotFound, resetError } = this.props
                if (errNotFound) {
                  setTimeout(() => {
                    resetError()
                  }, 5000)
                  return (
                    <Alert variant="danger" data-testid="error-not-found">
                      Card name "<strong>{errNotFound}</strong>" is not found
                    </Alert>
                  )
                }
              })()}
              <SearchForm
                searchCard={(search) => this.searchCard(search)}
                reset={() => this.reset()}
              />
              <div className="card py-3 my-3 shadow custom-gradient">
                <PageNav
                  className="d-flex justify-content-center"
                  record={this.state.record}
                  limit={this.state.limit}
                  next={() => this.setState({ record: this.state.record + 1 })}
                  prev={() => this.setState({ record: this.state.record - 1 })}
                  recordLength={(() => {
                    const { filter, cardList } = this.props
                    if (filter.length > 0) {
                      return filter.length
                    }
                    return cardList.length
                  })()}
                />
              </div>
              <div className="d-flex justify-content-between">
                <Misc
                  limit={this.state.limit}
                  cardList={this.props.cardList}
                  filter={this.props.filter}
                  setLimit={(value) => {
                    this.setState({
                      limit: value
                    })
                  }}
                />
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
              <div className="card py-3 my-3 shadow custom-gradient">
                <PageNav
                  className="d-flex justify-content-center"
                  record={this.state.record}
                  limit={this.state.limit}
                  next={() => this.setState({ record: this.state.record + 1 })}
                  prev={() => this.setState({ record: this.state.record - 1 })}
                  recordLength={(() => {
                    const { filter, cardList } = this.props
                    if (filter.length > 0) {
                      return filter.length
                    }
                    return cardList.length
                  })()}
                  data-testid="page-nav"
                />
              </div>
            </Col>
          </>
        ) : (
          // Looping buat card nya
          <Loading />
        )}
      </Row>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomePage))
