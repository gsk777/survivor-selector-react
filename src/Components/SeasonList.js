import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { BrowserView, MobileView } from 'react-device-detect';

import '../Styles/Season.css';

const SeasonList = (props) => {

    const [inHover, setHover] = useState(false);
    const [winnerText, setWinnerText] = useState(props.showWinner ? props.winner : 'Click To Reveal Winner');
    const [clicked, setClicked] = useState(props.showWinner);
    const [flipped, setFlipped] = useState(false);

    const toggleWinner = (season) => {
        setClicked(!clicked);
        setFlipped(true);
        props.onClick(season);
    }
    
    const afterFlip = () => {

        if (flipped === true) {
            if (winnerText === 'Click To Reveal Winner') {
                setWinnerText(props.winner);
                setFlipped(false);
            } else {
                setWinnerText('Click To Reveal Winner');
                setFlipped(false);
            }
        }    
    }

    return (
        <>
        <BrowserView>
            <Container fluid>
                <Row className="text-light font-weight-bold rounded" style={{ backgroundColor: props.color}}>
                    <Col xs={2} md={1} className="d-flex align-items-center">
                        <p className="season-number-list my-1">S{props.seasonNum}</p>
                    </Col>
                    <Col
                        xs={7} md={9}
                        className="d-flex justify-content-center align-items-center"
                        onClick={() => toggleWinner(props.seasonNum)}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <p
                            className={"winners-list my-1" + (flipped ? " flip" : "")}
                            onTransitionEnd={() => afterFlip()}
                        >{winnerText.toUpperCase()}</p>
                        <p
                            className={"season-name-list my-1 py-1 w-100 text-center" + (clicked || inHover ? " season-hovered" : "")}
                            style={{ backgroundColor: props.color }}
                        >{props.title}</p>
                    </Col>
                    <Col xs={3} md={2} className="d-flex justify-content-end align-items-center">
                        <div className="season-logo-list py-1">
                            <img
                                className="h-100"
                                src={props.image}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </BrowserView>
        <MobileView>
            <Container fluid>
                <Row className="text-light font-weight-bold rounded" style={{ backgroundColor: props.color}}>
                    <Col xs={2} md={1} className="d-flex align-items-center">
                        <p className="season-number-list my-1">S{props.seasonNum}</p>
                    </Col>
                    <Col xs={7} md={9} className="d-flex justify-content-center align-items-center">
                        <p
                            className="season-name-list my-1 py-1 w-100 text-center"
                            style={{ backgroundColor: props.color }}
                        >{props.title}</p>
                    </Col>
                    <Col xs={3} md={2} className="d-flex justify-content-end align-items-center">
                        <div className="season-logo-list py-1">
                            <img
                                className="h-100"
                                src={props.image}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </MobileView>
        </>
    )

}

export default SeasonList;