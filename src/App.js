import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import './Main.css'
import './Effect.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Navigation from './components/partials/Navbar'
import HomePage from './pages/HomePage'
import CardDetailPage from './pages/CardDetailPage'
import MyDeck from './pages/MyDeck'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="background"></div>
          <Navigation className="p-0 m-0" />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/card/:id" component={CardDetailPage} />

            <Route exact path="/my-deck" component={MyDeck} />

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
