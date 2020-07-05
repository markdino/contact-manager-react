import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "./App.css";
import Axios from "axios";
import Contact from "./components/contact";
import TopBar from './components/topBar';
import LogForm from './components/logForm'

Axios.defaults.withCredentials = true

class App extends Component {
  state = {
    contact: null,
    error: null,
    name: null,
    status: null,
    user: null,
    loading: true,
    showLogForm: false,
    logForm: 'login'
  };

  toggleForm = form => {
    this.setState({
      showLogForm: !this.state.showLogForm,
      logForm: form === 'signup' ? form : 'login'
    })
  }

  handleLogout = () => {
    Axios.get('http://localhost:1234/api/user/logout')
      .then(() => this.setUser(null))
      .catch(() => this.setUser(null))
  }

  setUser = user => {
    this.setState({ user })
  }
  setResponse = payload => {
    if (!payload)
      return this.setState({
        contact: null,
        error: 'Server is down or connection to the server refused.',
        name: 'Connection Refused',
        status: 404,
        loading: false
      });

    const { error, value, name } = payload.data
    this.setState({ contact: value, error, name, status: payload.status, loading: false })
  }

  getContact = () => {
    Axios.get('http://localhost:1234/api')
      .then(payload => this.setResponse(payload))
      .catch(payload => this.setResponse(payload.response))
  }

  getCurrentUser = () => {
    Axios.get('http://localhost:1234/api/user/me')
      .then(user => { this.setState({ user: user.data.value }) })
      .catch(() => { this.setState({ user: null }) })
  }

  handleDelete = id => {
    Axios.delete(`http://localhost:1234/api/contact/${id}`)
      .then(payload => {
        const deletedContact = payload.data.value
        const newContact = this.state.contact.filter(user => user._id !== deletedContact._id)
        this.setState({ contact: newContact })
      })
      .catch(payload => {
        const { error, name } = payload.response.data
        this.setState({ error, name })
      })
  }

  componentDidMount() {
    this.getContact()
    this.getCurrentUser()
  }
  render() {
    const { contact, user, loading, logForm, error, name } = this.state
    console.log(this.state)
    if (error) {
      alert(`${name}: \n ${error}`)
    }
    return (
      <Router>
        <main className="container">
          {this.state.showLogForm
            ? <LogForm setUser={this.setUser} onClose={this.toggleForm} form={logForm} />
            : null}
          <TopBar user={user} toggleForm={this.toggleForm} logOut={this.handleLogout} />
          <Switch>
            <Route
              path='/'
              render={props => (
                <Contact
                  contact={contact}
                  user={user}
                  loading={loading}
                  onDelete={this.handleDelete}
                  {...props} />
              )}
            />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
