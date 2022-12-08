import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useDrag } from 'react-dnd'

import seasonData from '../season-data';
import '../Styles/QueueTileSeason.css';

const QueueTileSeason = (props) => {

    const seasonColor = seasonData.get(props.season).seasonColor;

    const [{isDragging}, drag] = useDrag(() => ({
        type: 'season',
        item: { id: props.season, tier: props.tier },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <>
        <Container
            ref={drag}
            className="queue-tile-container rounded d-flex flex-column justify-content-center"
            style={{borderColor: seasonColor,
                    opacity: isDragging ? 0.5 : 1}}
        >
            <div className="rank-display">
                <p className="text-center font-weight-bold">{props.rank}</p>
            </div>
            <Row className="h-25">
                <Col>
                    <p className="queue-season-number text-center text-light font-weight-bold">S{props.season}</p>
                </Col>
            </Row>
            <Row className="h-50">
                <Col>
                    <p className="queue-season-name text-center text-light mt-1">{seasonData.get(props.season).seasonName}</p>
                </Col>
            </Row>
            <div className="corner-style" style={{backgroundImage: `linear-gradient(-45deg, ${seasonColor} 50%, transparent 50%)`}}></div>
        </Container>
        </>
    )
}

export default QueueTileSeason;