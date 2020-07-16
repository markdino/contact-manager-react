import React, { Component } from 'react';
import { ReactComponent as CameraSVG } from '../assets/svg/camera.svg'
import UserSVG from '../assets/svg/user.svg'
import './contactForm.css'

class ContactFrom extends Component {
    state = {
        avatar: null
    }
    render() {
        const { avatar } = this.state
        const userAvatar = avatar ? avatar : UserSVG
        console.log(userAvatar)
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
            </React.Fragment>
        );
    }
}

export default ContactFrom;