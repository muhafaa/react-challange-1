import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Loading from '../components/Loading'
import LeftSection from '../components/cardDetailPage/LeftSection'
import RightSection from '../components/cardDetailPage/RightSection'

// actions
import addToDeck from '../actions/addToDeck'

function mapStateToProps(state) {
  return {
    deckList: state.deckReducer.deckList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToDeck: (card) => dispatch(addToDeck(card))
  }
}

class CardDetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      card: {}
    }
  }

  componentDidMount() {
    const { params } = this.props.match
    axios({
      method: 'GET',
      url: 'https://db.ygoprodeck.com/api/v6/cardinfo.php?id=' + params.id
    })
      .then(({ data }) => {
        console.log(data[0])
        this.setState({
          card: data[0]
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    console.log(this.props.deckList)
    return (
      <div className="container text-white">
        {(() => {
          const { card } = this.state
          if (!card.hasOwnProperty('id')) {
            return <Loading />
          } else {
            // Contentnya disini
            return (
              <>
                <div className="d-flex justify-content-between mt-5">
                  <Link to="/">
                    <Button className="font-weight-bold text-uppercase">
                      Back To Home
                    </Button>
                  </Link>
                  {(() => {
                    const { deckList } = this.props
                    if (!deckList.some((deck) => deck.id === card.id)) {
                      return (
                        <Button
                          className="font-weight-bold text-uppercase"
                          variant="success"
                          onClick={() => {
                            this.props.addToDeck(card)
                          }}
                        >
                          Add to deck
                        </Button>
                      )
                    }
                  })()}
                </div>
                <Row className="my-5">
                  <Col sm={12} md={3} className="flex-column">
                    <LeftSection card={this.state.card} />
                  </Col>
                  <Col sm={12} md={9} className="flex-column">
                    <RightSection card={this.state.card} />
                  </Col>
                </Row>
              </>
            )
          }
        })()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailPage)
