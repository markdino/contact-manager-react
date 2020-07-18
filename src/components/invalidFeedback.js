import React from 'react';

const style = {
    width: '100%',
    marginTop: '0.25rem',
    fontSize: '80%',
    color: '#dc3545',
}

const InvalidFeedback = ({ feedback }) => (
    feedback
        ? <section style={style}>{feedback}</section>
        : null
)

export default InvalidFeedback;