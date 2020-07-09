import React from 'react';
import { ReactComponent as SearchSVG } from '../assets/svg/search.svg'
import { ReactComponent as AddSVG } from '../assets/svg/plus.svg'
import './search.css'

const Search = ({ onSearch }) => {
    const query = document.querySelector('#search-field')
    return (
        <nav id="search-nav" className="row align-item-center p-10">
            <section className="search-group row align-item-center">
                <label htmlFor="search-field">Search</label>
                <section id="search-border" className="row">
                    <input
                        type="search"
                        name="search"
                        id="search-field"
                        placeholder='name'
                        onChange={() => onSearch(query.value)} />
                    <button id="search-btn" onClick={() => onSearch(query.value)}>
                        <SearchSVG className="search-svg" />
                    </button>
                </section>
            </section>
            <a id="add-btn" className="row" title="Add new contact" href="/contact/create">
                <AddSVG className="add-svg" />
            </a>
        </nav>
    );
}

export default Search;