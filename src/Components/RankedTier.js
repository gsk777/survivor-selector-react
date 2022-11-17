import React, { useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useDrop } from 'react-dnd'

import RankedTileSeason from './RankedTileSeason';

import { MyRankingsContext } from './MyRankings';
import '../Styles/RankedTier.css';

const RankedTier = (props) => {

    const context = useContext(MyRankingsContext);

    const onDrop = (season, oldTier) => {
        context.removeFromQueue(season);
        context.addToRanked(season, null, props.tier, oldTier);
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'season',
        drop: monitor => {
            onDrop(monitor.id, monitor.tier);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }),[context.seasonQueue, context.ranked]);

    return (
        <Container
            fluid
            className="text-light p-0"
        >
            <Row className="mx-0">
                <Col className="tier-header text-center pt-2" xl={1} style={ {backgroundColor: props.color} }>
                    <h2>{props.tier}</h2>
                </Col>
                {context.ranked[props.tier].map(s => (
                    <Col xl={1} className="px-1 pt-1" key={s}>
                        <RankedTileSeason season={s} tier={props.tier}/>
                    </Col>
                ))}
                <Col ref={drop}>
                </Col>
            </Row>
        </Container>
    )
}

export default RankedTier;