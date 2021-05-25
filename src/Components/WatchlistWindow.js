import React, { useContext } from 'react';
import { MyWLContext } from './MyWatchlist';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WLSeason from './WLSeason';
import WLSeasonList from './WLSeasonList';

import { numSeasons } from '../season-data';

import '../Styles/WatchlistWindow.css';

const WatchlistWindow = () => {

    const context = useContext(MyWLContext);

    const seasonsArray = [];

    if (Object.keys(context.userWL).length !== 0) {
        switch (context.hideInactive) {
            case false:
                for (var f = 1; f <= numSeasons; f++) {
                    seasonsArray.push(f);
                }
                break;
            case true:
                for (var t = 1; t <=numSeasons; t++) {
                    if (context.userWL[t] !== "inactive") {
                        seasonsArray.push(t);
                    }
                }
                break;
            default:
                throw new Error('Unexpected value given for hideInactive');
        }
    }

    return (
        <>
        <Container fluid className="window">
            <Row className={(Object.keys(context.userWL).length !== 0) ? "d-none" : ""}>
                <Col className="text-center text-light py-5">
                    <h4>No active watchlist - Please select and add from above</h4>
                </Col>
            </Row>
            <div className="tiled">
                <Row className="py-2 mx-n1">
                    {seasonsArray.map(s => (
                        <Col xl={1} lg={2} className="py-2 px-1" key={s}>
                            <WLSeason season={s} />
                        </Col>
                    ))}
                </Row>
            </div>
            <div className="list">
                <Row>
                    <Col md={6} sm={6}>
                        <Row className="py-sm-2 pt-2">
                            {(seasonsArray.slice(0, (Math.round(seasonsArray.length / 2)))).map(s => (
                                <Col md={12} sm={12} className="wlseason-list-container px-2" key={s}>
                                    <WLSeasonList season={s} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col md={6} sm={6}>
                        <Row className="py-sm-2 pb-2">
                            {(seasonsArray.slice((Math.round(seasonsArray.length / 2)), seasonsArray.length)).map(s => (
                                <Col md={12} sm={12} className="wlseason-list-container px-2" key={s}>
                                    <WLSeasonList season={s} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
        </Container>
        </>
    )
}

export default WatchlistWindow;