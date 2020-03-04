import React, {Component} from 'react';
import {Row, Col, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import axios from 'axios';

import getCardList from '../actions/getCardList';

// Components
import Loading from '../components/Loading'
import SearchForm from '../components/homePage/SearchForm'
import PageNav from '../components/homePage/PageNav'
import CardDetail from '../components/CardDetail'
import CardPreview from '../components/CardPreview'
import Misc from '../components/homePage/Misc';

const mapStateToProps = (state) => {
  return {
    cardList: state.cardReducer.cardList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCardList: (data) => dispatch(getCardList(data))
  }
}

class HomePage extends Component{
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      yugiCards: props.cardList,
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
    const {getCardList} = this.props
    axios({
      method: 'GET',
      url: 'https://db.ygoprodeck.com/api/v6/cardinfo.php'
    })
      .then(({ data }) => {
        getCardList(data)
        this.setState({
          showLoading: false,
          cardDetail: {},
          filter: []
        })
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
    return this.props.cardList.slice(startPage < 0 ? 0 : startPage, endPage)
  }

  render() {
    return (
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
              <div className="card py-3 my-3 shadow custom-gradient">
                <PageNav
                  className="d-flex justify-content-center"
                  record={this.state.record}
                  limit={this.state.limit}
                  next={() => this.setState({ record: this.state.record + 1 })}
                  prev={() => this.setState({ record: this.state.record - 1 })}
                  recordLength={(() => {
                    const { filter } = this.state
                    if (filter.length > 0) {
                      return filter.length
                    }
                    return this.props.cardList.length
                  })()}
                />
              </div>
              <div className="d-flex justify-content-between">

               <Misc 
                 limit={this.state.limit}
                 cardList={this.props.cardList} 
                 filter={this.state.filter} 
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
                    const { filter } = this.state
                    if (filter.length > 0) {
                      return filter.length
                    }
                    return this.props.cardList.length
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
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)