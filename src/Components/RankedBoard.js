import React from 'react';
import { Row, Container } from 'react-bootstrap';

import RankedTier from './RankedTier';
import '../Styles/RankedBoard.css'

const RankedBoard = () => {

    const tierData = [
        { tier: "S", color: "#4db8ff"},
        { tier: "A", color: "#70dbdb"},
        { tier: "B", color: "#80ff80"},
        { tier: "C", color: "#ffff66"},
        { tier: "D", color: "#ffb366"},
        { tier: "F", color: "#ff6666"}
    ];

    return (
        <>
        <Container fluid className="ranked-window">
            <div>
                {tierData.map(s => (
                    <Row className="ranked-tier-row" style={ {borderColor: s.color} }>
                        <RankedTier tier={s.tier} color={s.color}></RankedTier>
                    </Row>
                ))}
            </div>
        </Container>
        </>
    )
}

export default RankedBoard;