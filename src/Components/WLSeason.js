import React, { useState, useContext } from 'react';
import { MyWLContext } from './MyWatchlist';
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

// used by WatchlistWindow.js to render the user's watchlist seasons in tiled view on larger viewports
const WLSeason = (props) => {

    const [inHover, setHover] = useState(false);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const context = useContext(MyWLContext);
    const seasonStatus = context.userWL[props.season];

    const seasonColor = seasonData.get(props.season).seasonColor;

    console.log('rendering ' + props.season);

    return (
        <>
        <Container
            className={
                "wlseason-container rounded" +
                ((seasonStatus === "inactive") ? " wlseason-inactive" : "")
            }
            style={{borderColor: seasonColor}}
            onClick={isMobile ? handleShow : () => (false)}
        >
            <BrowserView>
                <div
                    className={
                        "edit-wlseason text-light d-flex align-items-center rounded" +
                        (inHover ? " wlseason-hovered" : "")
                    }
                    style={{backgroundColor: seasonColor}}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <div>
                        <label className="cursor pl-xl-2 pl-lg-3">
                            <input
                                type="checkbox"
                                className="cursor mr-1"
                                checked={(seasonStatus === "watched") ? true : false}
                                onChange={() => context.onSeasonWatchedToggle(props.season)}
                            />
                            Watched
                        </label>
                        <label className="cursor pl-xl-2 pl-lg-3">
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
            <Row>
                <Col className="wlseason-text text-center text-light" style={{backgroundColor: seasonColor}}>
                    <p className="wlseason-number my-1 font-weight-bold">S{props.season}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className={"watched-container w-100 h-100" + ((seasonStatus !== "watched") ? " d-none" : "")}>
                        <div className="watched h-100 d-flex align-items-center justify-content-center">
                            <IconContext.Provider value={{ color: seasonColor }}>
                                <IoCheckmarkSharp className="checkmark"/>
                            </IconContext.Provider>
                        </div>
                    </div>
                    <img
                        className="w-100"
                        src={seasonData.get(props.season).seasonLogo}
                        alt=""
                    />
                </Col>
            </Row>
            <Row>
                <Col className="wlseason-text text-center text-light" style={{backgroundColor: seasonColor}}>
                    <div className="wlseason-name d-flex align-items-center justify-content-center">
                        <p className="my-1">{seasonData.get(props.season).seasonName}</p>
                    </div>
                </Col>
            </Row>
        </Container>
        {/* Display of "Watched" and "Active" checkboxes are switched from a hover effect to a modal on mobile */}
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

export default WLSeason;