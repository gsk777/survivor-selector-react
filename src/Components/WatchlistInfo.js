import React from 'react';
import { IconContext } from 'react-icons';
import { TiInfo } from 'react-icons/ti';

const listInfo = {
    "All 40": "All 40 seasons of Survivor. Get comfy.",
    "Keep the Scraps": "Almost everything. The bottom of the barrel not included.",
    "History of Survivor": "Great seasons + series defining strategy/players.",
    "Only the Best": "Greatest Hits - Only the best!"
}

const WatchlistInfo = (props) => {
    return (
        <>
            <IconContext.Provider value={{ size: "2em", color: "#0099ff" }}>
                <h6 className={"text-light text-center" + ((props.watchlist === "empty") ? " d-none" : "")}>
                    <TiInfo className={(props.watchlist === "empty") ? "d-none" : ""}/>
                    {listInfo[props.watchlist]}
                </h6>
            </IconContext.Provider>
        </>
    )
}

export default WatchlistInfo;