import React from 'react';

import Container from 'react-bootstrap/Container';

import '../Styles/SectionHeader.css';
import DarkOverlay from './DarkOverlay';

const SectionHeader = (props) => {
    return (
        <div className="position-relative">
            <Container fluid className="section-header-bg">
                <h2 className="section-header text-light">{props.section}</h2>
            </Container>
            <DarkOverlay active={props.active} />
        </div>
    )
}

export default SectionHeader;