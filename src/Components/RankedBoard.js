import React from 'react';
import { Row, Container } from 'react-bootstrap';

import RankedTier from './RankedTier';
import '../Styles/RankedBoard.css'

const RankedBoard = () => {

    const tierData = [
        { tier: "S", description: "Hall of Fame", color: "#4db8ff"},
        { tier: "A", description: "Amazing", color: "#70dbdb"},
        { tier: "B", description: "Strong", color: "#80ff80"},
        { tier: "C", description: "Average", color: "#ffff66"},
        { tier: "D", description: "Subpar", color: "#ffb366"},
        { tier: "F", description: "Poor", color: "#ff6666"}
    ];

    return (
        <>
        <Container fluid className="ranked-window">
            <div>
                {tierData.map(s => (
                    <Row className="ranked-tier-row" style={ {borderColor: s.color} }>
                        <RankedTier tier={s.tier} title={s.description} color={s.color}></RankedTier>
                    </Row>
                ))}
            </div>
        </Container>
        </>
    )
}

export default RankedBoard;