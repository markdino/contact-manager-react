import React, { Component } from 'react';
import Input from './input'
import InvalidFeedback from './invalidFeedback'
import Modal from './modal'
import Http from '../http'
import { toast } from 'react-toastify';
import { ReactComponent as CameraSVG } from '../assets/svg/camera.svg'
import UserSVG from '../assets/svg/user.svg'
import './contactForm.css'

class ContactFrom extends Component {
    state = {
        avatar: null,
        newAvatar: null,
        isPrivate: true,
        name: null,
        mobile: null,
        tel: null,
        email: null,
        address: null,
        showModal: false,
        error: null,
    }

    acceptAvatar = () => {
        this.setState({ avatar: this.state.newAvatar })
        this.onToggleModal()
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onToggleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }

    onSubmit = e => {
        e.preventDefault()
        const { avatar, isPrivate, name, mobile, tel, email, address, error } = this.state
        const { user, api, updateContact, history } = this.props

        const newContact = {
            avatar,
            private: isPrivate,
            name,
            mobile,
            tel,
            email,
            address,
            owner: user
        }

        Http.post(`${api}/contact`, newContact)
            .then(() => {
                updateContact()
                history.push('/')
            })
            .catch(payload => {
                if (!payload.response) {
                    this.setState({ error: 'Server is down or connection to the server refused.' })
                } else {
                    this.setState({ error: payload.response.data.error })
                }
                if (typeof error === 'string') toast.error(error)

            })
    }
    render() {
        const { avatar, newAvatar, isPrivate, name, mobile, tel, email, address, showModal, error } = this.state
        const userAvatar = avatar ? avatar : UserSVG
        const privateCheck = isPrivate ? { defaultChecked: true } : null
        return (
            <React.Fragment>
                <section className="thumbnail-details">
                    <section className="buttons">
                        <button id="cancel-btn" onClick={this.props.history.goBack}>
                            <p>Cancel</p>
                        </button>
                        <button id="save-btn" onClick={this.onSubmit}>
                            <p>Save</p>
                        </button>
                    </section>

                    <button className='camera-btn cursor-pointer' onClick={this.onToggleModal}>
                        <section id="add-photo" className="row">
                            <CameraSVG className='camera-svg' />
                        </section>
                    </button>
                </section>
                <section className="thumbnail-holder">
                    <img src={userAvatar} alt="profile avatar" id="img-avatar" />
                </section>
                {showModal
                    ? <Modal onClose={this.onToggleModal}>
                        <Input
                            label='Image link'
                            name='newAvatar'
                            placeholder="https://"
                            required
                            autoFocus
                            value={newAvatar}
                            onChange={this.onChange} />
                        <section className="buttons">
                            <button className='btn-success' onClick={this.acceptAvatar}>
                                Accept Image
                            </button>
                        </section>
                    </Modal>
                    : null}
                <main className="p-10">
                    <form onSubmit={this.onSubmit}>
                        <section className="input-group row">
                            <input
                                type="checkbox"
                                id="private"
                                name="private"
                                {...privateCheck}
                                onClick={() => this.setState({ isPrivate: !this.state.isPrivate })}
                            />
                            <label htmlFor="private">Private</label>
                        </section>
                        <Input label='Name' name='name' value={name} onChange={this.onChange} required />
                        <InvalidFeedback feedback={error ? error.name : null} />
                        <Input label='Mobile' type='tel' name='mobile' value={mobile} onChange={this.onChange} />
                        <InvalidFeedback feedback={error ? error.mobile : null} />
                        <Input label='Tel.' type='tel' name='tel' value={tel} onChange={this.onChange} />
                        <InvalidFeedback feedback={error ? error.tel : null} />
                        <Input label='Email' type='email' name='email' value={email} onChange={this.onChange} />
                        <InvalidFeedback feedback={error ? error.email : null} />
                        <Input label='Address' name='address' value={address} onChange={this.onChange} />
                        <InvalidFeedback feedback={error ? error.address : null} />
                    </form>
                </main>
            </React.Fragment>
        );
    }
}

export default ContactFrom;