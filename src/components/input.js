import React from 'react';
import './input.css'

const Input = ({ label, id, value, ...attributes }) => {
    return (
        <section className="input-group">
            <label htmlFor={id}>{label}</label>
            <input
                {...attributes}
                id={id}
                value={value}
            />
        </section>
    );
}

export default Input;