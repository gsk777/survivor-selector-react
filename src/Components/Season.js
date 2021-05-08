import React, { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import '../Styles/Season.css';

const Season = (props) => {

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
            <div className="m-1 rounded season-logo" style={{ borderColor: (props.color) }}>
                <BrowserView>
                    <h6
                        className={"winners w-100 text-center text-light" + (flipped ? " flip" : "")}
                        onTransitionEnd={() => afterFlip()}
                    >{winnerText}</h6>
                    <img
                        className={"logos w-100 mt-1" + (clicked || inHover ? " season-hovered" : "")}
                        src={props.image}
                        onClick={() => toggleWinner(props.seasonNum)}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    />
                </BrowserView>
                <MobileView>
                    <img
                        className="w-100 mt-1"
                        src={props.image}
                    />
                </MobileView>
                <div className="d-flex align-items-center justify-content-center season-title">
                    <h6 className="text-center text-light text-wrap pt-1 px-1">S{props.seasonNum} - {props.title}</h6>
                </div>
            </div>
    );
}

export default Season;