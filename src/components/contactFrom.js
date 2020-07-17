import React, { Component } from 'react';
import Input from './input'
import { ReactComponent as CameraSVG } from '../assets/svg/camera.svg'
import UserSVG from '../assets/svg/user.svg'
import './contactForm.css'

class ContactFrom extends Component {
    state = {
        avatar: null,
        isPrivate: true,
        name: null,
        mobile: null,
        tel: null,
        email: null,
        address: null
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const { avatar, isPrivate, name, mobile, tel, email, address } = this.state
        const userAvatar = avatar ? avatar : UserSVG
        const privateCheck = isPrivate ? { checked: true } : null
        return (
            <React.Fragment>
                <section className="thumbnail-details">
                    <section className="buttons">
                        <button id="cancel-btn">
                            <p>Cancel</p>
                        </button>
                        <button id="save-btn">
                            <p>Save</p>
                        </button>
                    </section>

                    <button className='camera-btn cursor-pointer'>
                        <section id="add-photo" className="row">
                            <CameraSVG className='camera-svg' />
                        </section>
                    </button>
                </section>
                <section className="thumbnail-holder">
                    <img src={userAvatar} alt="profile avatar" id="img-avatar" />
                </section>

                <main class="p-10">
                    <form>
                        <section class="input-group row">
                            <input
                                type="checkbox"
                                id="private"
                                name="private"
                                {...privateCheck}
                                onClick={() => this.setState({ isPrivate: !this.state.isPrivate })}
                            />
                            <label for="private">Private</label>
                        </section>
                        <Input label='Name' name='name' value={name} onChange={this.onChange} required />
                        <Input label='Mobile' type='tel' name='mobile' value={mobile} onChange={this.onChange} />
                        <Input label='Tel.' type='tel' name='tel' value={tel} onChange={this.onChange} />
                        <Input label='Email' type='email' name='email' value={email} onChange={this.onChange} />
                        <Input label='Address' name='address' value={address} onChange={this.onChange} />
                    </form>
                </main>
            </React.Fragment>
        );
    }
}

export default ContactFrom;