import "./search.scss"
import search from "../../assets/icn_search.svg"

import React from 'react';

const Search = (props) => {
    return (
        <div className="search">
            <input
                className="search-input"
                type="input"
                id="search"
                placeholder="Search"
                value={props.value}
                onChange={props.onChange}
            />
            <div className="search-btn" onClick={props.onSubmit}>
                <img src={search} alt="Найти"/>
            </div>
        </div>
    );
};

export default Search;