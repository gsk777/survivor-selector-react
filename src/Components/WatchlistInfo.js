import React, { useContext } from 'react';
import { MyWLContext } from './MyWatchlist';
import { IconContext } from 'react-icons';
import { TiInfo } from 'react-icons/ti';

// used by MyWatchlist.js to render descriptions of the selected watchlist template
const WatchlistInfo = () => {

    const listInfo = {
        "All 40": "All 40 seasons of Survivor. Get comfy.",
        "Keep the Scraps": "Almost everything. The bottom of the barrel not included.",
        "History of Survivor": "Great seasons + series defining strategy/players.",
        "Only the Best": "Greatest Hits - Only the best!"
    }

    const context = useContext(MyWLContext);

    return (
        <>
            <IconContext.Provider value={{ size: "2em", color: "#0099ff" }}>
                <h6 className={"text-light text-center" + ((context.selectedList === "empty") ? " d-none" : "")}>
                    <TiInfo className={(context.selectedList === "empty") ? "d-none" : ""}/>
                    {listInfo[context.selectedList]}
                </h6>
            </IconContext.Provider>
        </>
    )
}

export default WatchlistInfo;