import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BrowserView, MobileView, isMobile, isBrowser } from 'react-device-detect';
import { IconContext } from 'react-icons';
import { IoCheckmarkSharp } from 'react-icons/io5';

import '../Styles/WLSeason.css';

import seasonData from '../season-data';

const WLSeason = (props) => {

    const [inHover, setHover] = useState(false);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const seasonColor = seasonData.get(props.season).seasonColor;

    return (
        <>
        <Container
            className={
                "season-container rounded" +
                ((props.seasonStatus === "inactive") ? " inactive" : "")
            }
            style={{borderColor: seasonColor}}
            onClick={isMobile ? handleShow : () => (false)}
        >
            <BrowserView>
                <div
                    className={"edit-season text-light d-flex align-items-center rounded" + (inHover ? " hovered" : "")}
                    style={{backgroundColor: seasonColor}}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <div>
                        <label className="pl-xl-2 pl-lg-3 edit-checkbox">
                            <input
                                type="checkbox"
                                className="mr-1 edit-checkbox"
                                checked={(props.seasonStatus === "watched") ? true : false}
                                onChange={() => props.onSeasonWatchedToggle(props.season)}
                            />
                            Watched
                        </label>
                        <label className="pl-xl-2 pl-lg-3 edit-checkbox">
                            <input
                                type="checkbox"
                                className="mr-1 edit-checkbox"
                                checked={(props.seasonStatus === "active" || props.seasonStatus === "watched") ? true : false}
                                onChange={() => props.onSeasonActiveToggle(props.season)}
                            />
                            Active
                        </label>
                    </div>
                </div>
            </BrowserView>
            <Row>
                <Col className="text-center text-light textbox" style={{backgroundColor: seasonColor}}>
                    <p className="my-1 font-weight-bold season-number">S{props.season}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className={"watched-container w-100 h-100" + ((props.seasonStatus !== "watched") ? " d-none" : "")}>
                        <div className="watched h-100 d-flex align-items-center justify-content-center">
                            <IconContext.Provider value={{ color: seasonColor }}>
                                <IoCheckmarkSharp className="checkmark"/>
                            </IconContext.Provider>
                        </div>
                    </div>
                    <img
                        className="w-100"
                        src={seasonData.get(props.season).seasonLogo}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="text-center text-light textbox" style={{backgroundColor: seasonColor}}>
                    <div className="d-flex align-items-center justify-content-center season-name">
                        <p className="my-1">{seasonData.get(props.season).seasonName}</p>
                    </div>
                </Col>
            </Row>
        </Container>
        <MobileView>
            <Modal show={show} onHide={handleClose} size="sm" contentClassName="edit-season-modal">
                <Modal.Header closeButton style={{backgroundColor: seasonColor}}>
                    <Modal.Title className="text-light edit-season-title">S{props.season} - {seasonData.get(props.season).seasonName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center justify-content-center edit-season-body">
                    <div>
                        <label className="mt-2 edit-checkbox">
                            <input
                                type="checkbox"
                                className="mr-1 edit-checkbox"
                                checked={(props.seasonStatus === "watched") ? true : false}
                                onChange={() => props.onSeasonWatchedToggle(props.season)}
                            />
                            Watched
                        </label>
                        <label className="pl-2 edit-checkbox">
                            <input
                                type="checkbox"
                                className="mr-1 edit-checkbox"
                                checked={(props.seasonStatus === "active" || props.seasonStatus === "watched") ? true : false}
                                onChange={() => props.onSeasonActiveToggle(props.season)}
                            />
                            Active
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor: seasonColor}}>
                    <Button variant="light" size="sm" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </MobileView>
        </>
    )
}

export default WLSeason;