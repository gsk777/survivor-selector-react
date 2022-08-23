import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import RankingQueue from './RankingQueue';
import RankedBoard from './RankedBoard';

const RankingSet = (props) => {
    return (
        <>
            <p>{props.type}</p>
            <Row className="justify-content-center mx-0">
                <Col lg={10}>
                    <h5 className="text-light text-center">Drag and drop to rank</h5>
                </Col>
            </Row>
            <DndProvider backend={HTML5Backend}>
                <RankingQueue />
                <br/>
                <RankedBoard />
            </DndProvider>
        </>
    )
}

export default RankingSet;