import React, { Component } from 'react';
import Http from '../http';
import { toast } from 'react-toastify';
import Modal from './modal'
import Input from './input'
import InvalidFeedback from './invalidFeedback'

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
        Http.post(`${this.props.api}/user/${form}`, { username, password })
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
        return (
            <Modal onClose={this.close} >
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
                    <Input
                        label='Username'
                        name='username'
                        id='username'
                        value={username}
                        onChange={this.onChange}
                        required
                        autoFocus
                    />
                    <Input
                        label='Password'
                        name='password'
                        id='password'
                        type='password'
                        value={password}
                        onChange={this.onChange}
                        required
                    />
                    <InvalidFeedback feedback={(response) ? response.error : null} />
                    <section className="buttons">
                        <button
                            type="submit"
                            className={form === 'signup' ? 'btn-primary' : 'btn-success'}
                        >
                            {form}
                        </button>
                    </section>
                </form>
            </Modal>
        );
    }
}

export default LogForm;