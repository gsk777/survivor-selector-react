import React, { useContext } from 'react';
import { HomeContext } from './Home';

import '../Styles/FilterBox.css';

// used by FilterGroup.js to render individual checkboxes
const FilterBox = (props) => {

    const context = useContext(HomeContext);

    return (
        <>
            <label className="filter-box">
                <input
                    type="checkbox"
                    className="filter-box mr-2"
                    checked={props.status}
                    onChange={() => context.onFilterClick(props.filterName, props.label, props.status)}
                />
                {props.label}
            </label>
        </>
    );
}

export default FilterBox;