import React from 'react';
import './input.css'

const Input = ({ label, id, name, value, ...attributes }) => {
    const newId = id ? id : name
    return (
        <section className="input-group">
            <label htmlFor={newId}>{label}</label>
            <input
                {...attributes}
                id={newId}
                name={name}
                value={value}
            />
        </section>
    );
}

export default Input;