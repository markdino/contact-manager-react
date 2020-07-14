import React from 'react';
import { ReactComponent as Close } from '../assets/svg/times.svg';
import './modal.css'

const Modal = ({ children, onClose }) => {
    return (
        <section className="modal">
            <section className="row align-item-center modal-wrapper">
                <main className="modal-container">
                    {onClose
                        ? <section className="d-flex row-reverse">
                            <Close className='close' onClick={onClose} />
                        </section>
                        : null}
                    {children}
                </main>
            </section>
        </section>
    );
}

export default Modal;