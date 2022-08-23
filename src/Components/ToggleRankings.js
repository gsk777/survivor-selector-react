import React, { useContext } from 'react';
import { MyRankingsContext } from './MyRankings';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ToggleRankings = () => {

    const context = useContext(MyRankingsContext);

    return (
        <Row className="justify-content-center">
            <Col
                xs={3}
                className={"text-right " + (context.selectedRanking === 'seasons' ? " text-light" : "")}
                onClick={() => context.onRankingsToggle('seasons')}
            >SEASONS</Col>
            <Col
                xs={3}
                className={(context.selectedRanking === 'winners' ? "text-light" : "")}
                onClick={() => context.onRankingsToggle('winners')}
            >WINNERS</Col>
        </Row>
    )
}

export default ToggleRankings;