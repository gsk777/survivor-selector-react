import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BrowserView, MobileView, isMobile, isBrowser } from 'react-device-detect';
import { IconContext } from 'react-icons';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

import '../Styles/WLSeason.css';

import seasonData from '../season-data';

const WLSeasonList = (props) => {

    const [inHover, setHover] = useState(false);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const seasonColor = seasonData.get(props.season).seasonColor;

    return (
        <>
        <Container
            className={"season-list-container" + ((props.seasonStatus === "inactive") ? " inactive" : "")}
            onClick={isMobile ? handleShow : () => (false)}
        >
            <BrowserView>
                <div
                    className={"edit-list-season text-light d-flex align-items-center justify-content-center" + (inHover ? " hovered" : "")}
                    style={{backgroundColor: seasonColor}}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <div>
                        <label className="pr-2 pt-2 edit-checkbox">
                            <input
                                type="checkbox"
                                className="mr-1 edit-checkbox"
                                checked={(props.seasonStatus === "watched") ? true : false}
                                onChange={() => props.onSeasonWatchedToggle(props.season)}
                            />
                            Watched
                        </label>
                        <label className="pl-2 pt-1 edit-checkbox">
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
                <Col className="text-light col-2" style={{backgroundColor: seasonColor}}>
                    <p className="my-1 font-weight-bold season-number">S{props.season}</p>
                </Col>
                <Col className="text-light col-8 px-2" style={{backgroundColor: seasonColor}}>
                    <div className="d-flex align-items-center justify-content-center season-name-list">
                        <p className="my-1">{seasonData.get(props.season).seasonName}</p>
                    </div>
                </Col>
                <Col className="col-2 text-center" style={{backgroundColor: seasonColor}}>
                    <div className={((props.seasonStatus !== "watched") ? "d-none" : "")}>
                        <IconContext.Provider value={{ color: "#ffffff" }}>
                            <IoCheckmarkCircleSharp className="checkmark-list my-1"/>
                        </IconContext.Provider>
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

export default WLSeasonList;