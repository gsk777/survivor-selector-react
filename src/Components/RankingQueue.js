import React, { useContext } from 'react';
import { MyRankingsContext } from './MyRankings';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useDrop } from 'react-dnd'

import QueueTileSeason from './QueueTileSeason';

import '../Styles/RankingQueue.css';

const RankingQueue = () => {

    const context = useContext(MyRankingsContext);

    const onDrop = (season, oldTier) => {
        if (oldTier !== undefined) {
            context.addToQueue(season, oldTier);
        }
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

    return(
        <>
            <Container  ref={drop} fluid className="queue-window">
                <div>
                    <Row className="mx-0">
                        {context.seasonQueue.map(s => (
                            <Col xl={1} className="py-1 px-1" key={s}>
                                <QueueTileSeason season={s} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default RankingQueue;