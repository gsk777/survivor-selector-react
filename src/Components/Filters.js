import React from 'react';
import FilterGroup from './FilterGroup';
import SectionHeader from './SectionHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../Styles/Filters.css';

const filtersData = new Map();

filtersData.set(1, {
    filterName: "Cast Type",
    filterOptions: {
        "All Newbie": true,
        "All Returnee": true,
        "Mixed": true
    }
});

filtersData.set(2, {
    filterName: "Final Tribal",
    filterOptions: {
        "Final 2": true,
        "Final 3": true
    }
});

filtersData.set(3, {
    filterName: "Starting Tribes",
    filterOptions: {
        "2": true,
        "3": true,
        "4": true
    }
});

filtersData.set(4, {
    filterName: "Second Chance",
    filterOptions: {
        "None": true,
        "Redemption Island": true,
        "Edge of Extinction": true,
        "Outcasts": true
    }
});

const Filters = (props) => {

    const updateStatus = (status) => {
        filtersData.set(1, {
            ...filtersData.get(1),
            filterOptions: status['Cast Type']
        });
        filtersData.set(2, {
            ...filtersData.get(2),
            filterOptions: status['Final Tribal']
        });
        filtersData.set(3, {
            ...filtersData.get(3),
            filterOptions: status['Starting Tribes']
        });
        filtersData.set(4, {
            ...filtersData.get(4),
            filterOptions: status['Second Chance']
        });
    }
    
    updateStatus(props.filter);
    const filtersList = []
    for (var i = 1; i <= filtersData.size; i++) {
        filtersList.push(i);
    }

    return (
        <>
            <SectionHeader section={"Filters"} active={props.active} />
            <Container fluid className={props.active ? "filters-active" : ""} >
                <Container className="pb-1">
                    <Row noGutters >
                        {filtersList.slice(0, 2).map(f => (
                            <Col xs={6} key={f}>
                                <FilterGroup
                                    filterName={filtersData.get(f).filterName}
                                    filterOptions={filtersData.get(f).filterOptions}
                                    onFilterClick={props.onFilterClick}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Row noGutters >
                        {filtersList.slice(2, 4).map(f => (
                            <Col xs={6} key={f}>
                                <FilterGroup
                                    filterName={filtersData.get(f).filterName}
                                    filterOptions={filtersData.get(f).filterOptions}
                                    onFilterClick={props.onFilterClick}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
                <br/>
            </Container>
        </>
    );
}

export default Filters;