import React from 'react';
import Row from 'react-bootstrap/Row';
import FilterBox from '../Components/FilterBox';
import '../Styles/FilterGroup.css';

const FilterGroup = (props) => {

    const optionsList = Object.keys(props.filterOptions);
    const statusList = Object.values(props.filterOptions);

    const numOptions = []
    for (var i = 0; i < optionsList.length; i++) {
        numOptions.push(i);
    }

    return (
        <div className="col-12 py-2 text-light text-center">
            <h5 className="filter-title">{props.filterName}</h5>
            {numOptions.map((option) => (
                <Row key={option} className="filter-box-row text-start">
                    <FilterBox
                        key={option}
                        filterName={props.filterName}
                        label={optionsList[option]}
                        status={statusList[option]}
                    />
                </Row>
            ))}
        </div>
    );
}

export default FilterGroup;