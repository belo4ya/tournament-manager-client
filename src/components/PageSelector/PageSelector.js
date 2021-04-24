import './page-selector.scss'

import React from 'react';

const PageSelector = (props) => {
    return (
        <div className="page-selector">
            <button className="arrow" onClick={props.onPrevPage}>←</button>
            <div className="current-page">{props.page}</div>
            <button className="arrow" onClick={props.onNextPage}>→</button>
        </div>
    );
};

export default PageSelector;