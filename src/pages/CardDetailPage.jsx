import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import LeftSection from '../components/cardDetailPage/LeftSection'
import RightSection from '../components/cardDetailPage/RightSection'

// actions
import addToDeck from '../actions/addToDeck'
import getCardDetail from '../actions/getCardDetail'

function mapStateToProps(state) {
  return {
    deckList: state.deckReducer.deckList,
    cardDetail: state.cardReducer.cardDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToDeck: (card) => dispatch(addToDeck(card)),
    getCardDetail: (cardId) => dispatch(getCardDetail(cardId))
  }
}

class CardDetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { params } = this.props.match
    const { getCardDetail } = this.props
    getCardDetail(params.id)
  }

  render() {
    return (
      <div className="container text-white" data-testid="card-detail-page">
        {(() => {
          const { cardDetail } = this.props

          if (!cardDetail.hasOwnProperty('id')) {
            return <Loading />
          } else {
            // Contentnya disini
            return (
              <>
                <div className="d-flex justify-content-between mt-5">
                  <Button
                    className="font-weight-bold text-uppercase"
                    onClick={() => {
                      this.props.history.goBack()
                    }}
                  >
                    Back
                  </Button>
                  {(() => {
                    const { deckList } = this.props
                    if (!deckList.some((deck) => deck === cardDetail.id)) {
                      return (
                        <Button
                          className="font-weight-bold text-uppercase"
                          variant="success"
                          onClick={() => {
                            this.props.addToDeck(cardDetail)
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
                    <LeftSection card={this.props.cardDetail} />
                  </Col>
                  <Col sm={12} md={9} className="flex-column">
                    <RightSection card={this.props.cardDetail} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CardDetailPage))
