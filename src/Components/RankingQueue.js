import React, { useContext } from 'react';
import { MyRankingsContext } from './MyRankings';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import QueueTileSeason from './QueueTileSeason';

import '../Styles/RankingQueue.css';

const RankingQueue = () => {

    const context = useContext(MyRankingsContext);

    return(
        <>
            <Container fluid className="queue-window">
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