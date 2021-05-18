import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IconContext } from 'react-icons';
import { IoGrid, IoList } from 'react-icons/io5';
import '../Styles/ViewToggle.css';

const ViewToggle = (props) => {

    return (
        <Container fluid>
            <Row noGutters className="justify-content-end">
                <Col className="d-flex justify-content-end pr-1">
                    <IconContext.Provider value={{ color: ((props.listView === "tiled") ? "#ffffff" : "#737373") }}>
                        <IoGrid
                            className="view-selected"
                            onClick={() => props.onToggle("tiled")}
                        />
                    </IconContext.Provider>
                    <span className="pl-3">
                        <IconContext.Provider value={{ color: ((props.listView === "list") ? "#ffffff" : "#737373") }}>
                            <IoList
                                className="view-selected"
                                onClick={() => props.onToggle("list")}
                            />
                        </IconContext.Provider>
                    </span>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewToggle;