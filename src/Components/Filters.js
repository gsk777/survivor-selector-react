import React, { useContext } from 'react';
import { HomeContext } from './Home';
import FilterGroup from './FilterGroup';
import SectionHeader from './SectionHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../Styles/Filters.css';

const Filters = () => {

    const context = useContext(HomeContext);
    const isActive = (context.activeSelector === "filters") ? true : false;

    const filters = {
        1: "Cast Type",
        2: "Final Tribal",
        3: "Starting Tribes",
        4: "Second Chance"
    };

    const filtersList = Object.keys(filters);

    return (
        <>
            <SectionHeader section={"Filters"} active={isActive} />
            <Container fluid className={isActive ? "filters-active" : ""} >
                <Container className="pb-1">
                    <Row noGutters >
                        {filtersList.slice(0, 2).map(f => (
                            <Col xs={6} key={f}>
                                <FilterGroup
                                    filterName={filters[f]}
                                    filterOptions={context.filterStatus[filters[f]]}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Row noGutters >
                        {filtersList.slice(2, 4).map(f => (
                            <Col xs={6} key={f}>
                                <FilterGroup
                                    filterName={filters[f]}
                                    filterOptions={context.filterStatus[filters[f]]}
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