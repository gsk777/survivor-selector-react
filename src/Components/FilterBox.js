import React from 'react';

import '../Styles/FilterBox.css';

const FilterBox = (props) => {
    return (
        <>
            <label className="filter-box">
                <input
                    type="checkbox"
                    className="filter-box mr-2"
                    checked={props.status}
                    onChange={() => props.onFilterClick(props.filterName, props.label, props.status)}
                />
                {props.label}
            </label>
        </>
    );
}

export default FilterBox;