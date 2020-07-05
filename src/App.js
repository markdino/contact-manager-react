import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Contact from "./components/contact";
import TopBar from './components/topBar';
import LogForm from './components/logForm';

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
  toastType = status => {
    if (status >= 500) {
      return 'dark'
    } else if (status >= 400) {
      return 'error'
    } else if (status >= 300) {
      return 'warning'
    } else if (status >= 200) {
      return 'success'
    } else {
      return 'info'
    }
  }

  serverIsDown = () => this.setState({
    error: 'Server is down or connection to the server refused.',
    name: 'Connection Refused',
    status: 503,
    loading: false
  })

  toggleForm = form => {
    this.setState({
      showLogForm: !this.state.showLogForm,
      logForm: form === 'signup' ? form : 'login'
    })
  }

  handleLogout = () => {
    Axios.get('http://localhost:1234/api/user/logout')
      .then(() => {
        this.setUser(null)
        toast.info('User had Logout', { autoClose: 2500 })
      })
      .catch(() => this.setUser(null))
  }

  setUser = user => {
    this.setState({ user })
  }

  getContact = () => {
    const setResponse = payload => {
      if (!payload)
        return this.serverIsDown();

      const { error, value, name } = payload.data
      this.setState({ contact: value, error, name, status: payload.status, loading: false })
    }

    Axios.get('http://localhost:1234/api')
      .then(payload => setResponse(payload))
      .catch(payload => {
        setResponse(payload.response)
        toast[this.toastType(this.state.status)](this.state.error)
      })
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
        if (!payload.response)
          return (
            this.serverIsDown(),
            toast[this.toastType(this.state.status)](this.state.error)
          )

        const { error, name } = payload.response.data
        this.setState({ error, name, status: payload.response.status })
        toast[this.toastType(this.state.status)](this.state.error)
        this.getContact()
      })
  }

  componentDidMount() {
    this.getContact()
    this.getCurrentUser()
  }
  render() {
    const { contact, user, loading, logForm } = this.state
    console.log(this.state)

    return (
      <Router>
        <main className="container">
          <ToastContainer
            position='top-center'
            autoClose={5000}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
          />
          {this.state.showLogForm
            ? <LogForm setUser={this.setUser} onClose={this.toggleForm} form={logForm} />
            : null}
          <TopBar user={user} toggleForm={this.toggleForm} logOut={this.handleLogout} />
          <Switch>
            <Route
              path='/'
              exact
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
