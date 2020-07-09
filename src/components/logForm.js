import React, { Component } from 'react';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { ReactComponent as Close } from '../assets/svg/times.svg'

class LogForm extends Component {
    state = {
        username: '',
        password: '',
        response: null
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    reset = () => {
        this.setState({
            username: '',
            password: '',
            form: '',
            response: null
        })
    }

    close = () => {
        this.reset()
        this.props.onClose()
    }

    onSubmit = e => {
        e.preventDefault();

        const { username, password, form } = this.state
        Axios.post(`${this.props.api}user/${form}`, { username, password }, { withCredentials: 'include' })
            .then(payload => {
                toast.success(payload.data.name, { autoClose: 2500 })
                this.props.setUser(payload.data.value)
                this.close()
            })
            .catch(payload => {
                if (!payload.response)
                    return this.setState({
                        response: {
                            error: 'Server is down or connection to the server refused.',
                            name: 'Connection Refused',
                            value: null,
                        }
                    });

                this.setState({ response: payload.response.data })
            })
    }

    componentDidMount() {
        this.setState({ form: this.props.form })
    }

    render() {
        const { username, password, response, form } = this.state
        const closeStyle = {
            width: '10px',
            fill: '#6c757d',
            padding: '10px',
            cursor: 'pointer',
            margin: '-20px -10px 0px 0px'
        }
        return (
            <React.Fragment>
                <ToastContainer
                    position='top-center'
                    autoClose={5000}
                    closeOnClick
                    pauseOnFocusLoss
                    pauseOnHover
                />
                <section id="img-modal">
                    <section className="row align-item-center modal-wrapper">
                        <main className="modal-container">
                            <section className="d-flex row-reverse">
                                <Close style={closeStyle} onClick={this.close} />
                            </section>
                            <header className="row flex-space-between">
                                <h1
                                    className={form === 'signup' ? 'text-primary' : 'text-muted cursor-pointer'}
                                    onClick={() => this.setState({ form: 'signup' })}
                                >
                                    Sign Up
                            </h1>
                                <h1 className="text-muted">|</h1>
                                <h1
                                    className={form === 'login' ? 'text-success' : 'text-muted cursor-pointer'}
                                    onClick={() => this.setState({ form: 'login' })}
                                >
                                    Login
                            </h1>
                            </header>
                            <form onSubmit={this.onSubmit}>
                                <section className="input-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="username"
                                        name="username"
                                        id="username"
                                        value={username}
                                        onChange={this.onChange}
                                        required
                                        autoFocus
                                    />
                                </section>
                                <section className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={this.onChange}
                                        required
                                    />
                                </section>
                                <section className='invalid-feedback'>
                                    {(response) ? response.error : ''}
                                </section>
                                <section className="buttons">
                                    <button
                                        type="submit"
                                        className={form === 'signup' ? 'btn-primary' : 'btn-success'}
                                    >
                                        {form}
                                    </button>
                                </section>
                            </form>
                        </main>
                    </section>
                </section>
            </React.Fragment>
        );
    }
}

export default LogForm;