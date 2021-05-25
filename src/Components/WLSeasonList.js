import React, { useState, useContext } from 'react';
import { MyWLContext } from './MyWatchlist';
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

    const context = useContext(MyWLContext);
    const seasonStatus = context.userWL[props.season];

    const seasonColor = seasonData.get(props.season).seasonColor;

    return (
        <>
        <Container
            className={"cursor" + ((seasonStatus === "inactive") ? " wlseason-inactive" : "")}
            onClick={isMobile ? handleShow : () => (false)}
        >
            <BrowserView>
                <div
                    className={
                        "edit-wlseason-list text-light d-flex align-items-center justify-content-center" +
                        (inHover ? " wlseason-hovered" : "")
                    }
                    style={{backgroundColor: seasonColor}}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <div>
                        <label className="cursor pr-2 pt-2">
                            <input
                                type="checkbox"
                                className="cursor mr-1"
                                checked={(seasonStatus === "watched") ? true : false}
                                onChange={() => context.onSeasonWatchedToggle(props.season)}
                            />
                            Watched
                        </label>
                        <label className="cursor pl-2 pt-1">
                            <input
                                type="checkbox"
                                className="cursor mr-1"
                                checked={(seasonStatus === "active" || seasonStatus === "watched") ? true : false}
                                onChange={() => context.onSeasonActiveToggle(props.season)}
                            />
                            Active
                        </label>
                    </div>
                </div>
            </BrowserView>
            <Row className="rounded" style={{ backgroundColor: seasonColor }}>
                <Col xs={2} className="text-light">
                    <p className="wlseason-number my-1 font-weight-bold">S{props.season}</p>
                </Col>
                <Col xs={8} className="text-light px-2">
                    <div className="wlseason-name-list d-flex align-items-center justify-content-center">
                        <p className="my-1">{seasonData.get(props.season).seasonName}</p>
                    </div>
                </Col>
                <Col xs={2} className="text-center">
                    <div className={((seasonStatus !== "watched") ? "d-none" : "")}>
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
                    <Modal.Title className="edit-season-title text-light">
                        S{props.season} - {seasonData.get(props.season).seasonName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="edit-season-body d-flex align-items-center justify-content-center">
                    <div>
                        <label className="cursor mt-2">
                            <input
                                type="checkbox"
                                className="cursor mr-1"
                                checked={(seasonStatus === "watched") ? true : false}
                                onChange={() => context.onSeasonWatchedToggle(props.season)}
                            />
                            Watched
                        </label>
                        <label className="cursor pl-2">
                            <input
                                type="checkbox"
                                className="cursor mr-1"
                                checked={(seasonStatus === "active" || seasonStatus === "watched") ? true : false}
                                onChange={() => context.onSeasonActiveToggle(props.season)}
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