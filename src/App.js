import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Contacts from "./components/contacts";
import TopBar from './components/topBar';
import LogForm from './components/logForm';

Axios.defaults.withCredentials = true
const apiBaseUri = process.env.REACT_APP_API_BASE_URI

class App extends Component {
  state = {
    contact: null,
    error: null,
    name: null,
    status: null,
    user: null,
    loading: false,
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
    Axios.get(`${apiBaseUri}user/logout`)
      .then(() => {
        this.setUser(null)
        toast.info('User had Logout', { autoClose: 2500 })
      })
      .catch(() => this.setUser(null))
  }

  setUser = user => {
    this.setState({ user })
  }


  getContact = query => {
    const apiRoute = `${apiBaseUri}${query ? `search?name=${query}` : ''}`

    const setContact = payload => {
      if (!payload)
        return this.serverIsDown();

      const { error, value, name } = payload.data
      this.setState({ contact: value, error, name, status: payload.status, loading: false })
    }

    this.setState({ loading: true })
    Axios.get(apiRoute)
      .then(payload => setContact(payload))
      .catch(payload => {
        setContact(payload.response)
        toast[this.toastType(this.state.status)](this.state.error)
      })
  }

  getCurrentUser = () => {
    Axios.get(`${apiBaseUri}user/me`)
      .then(user => { this.setState({ user: user.data.value }) })
      .catch(() => { this.setState({ user: null }) })
  }

  handleDelete = id => {
    Axios.delete(`${apiBaseUri}contact/${id}`)
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
            ? <LogForm
              setUser={this.setUser}
              onClose={this.toggleForm}
              form={logForm}
              api={apiBaseUri}
            />
            : null}
          <TopBar user={user} toggleForm={this.toggleForm} logOut={this.handleLogout} />
          <Switch>
            <Route
              path='/'
              exact
              render={props => (
                <Contacts
                  contact={contact}
                  user={user}
                  loading={loading}
                  onDelete={this.handleDelete}
                  getContact={this.getContact}
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
