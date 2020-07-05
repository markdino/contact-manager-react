import React from 'react'
import './topBar.css'

const TopBar = ({ user, toggleForm, logOut }) => {
    return (
        <section className="top-bar bg-dark text-light row flex-space-between">
            <section className="text-success text-ellipsis">
                {`${user ? user.username + ' | ' : ''}`}<span className="text-light">Contact Manager</span>
            </section>
            {user
                ? <section>
                    <button className="btn badge badge-pill badge-secondary" onClick={logOut}>
                        logout
                    </button>
                </section>
                : <section>
                    <button className="btn badge badge-pill badge-primary" onClick={() => toggleForm('signup')}>
                        signup
                    </button>
                    <button className="btn badge badge-pill badge-success" onClick={toggleForm}>
                        login
                    </button>
                </section>
            }

        </section>
    );
}

export default TopBar;