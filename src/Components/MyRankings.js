import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SectionHeader from './SectionHeader';
import ToggleRankings from './ToggleRankings';
import RankingSet from './RankingSet';

import { seasonNumArray } from '../season-data';

export const MyRankingsContext = React.createContext();

const MyRankings = () => {

    const [selectedRanking, toggleRanking] = useState("seasons");
    const [seasonQueue, setSeasonQueue] = useState(seasonNumArray);
    const [ranked, setRanked] = useState({
        "S": [],
        "A": [],
        "B": [],
        "C": [],
        "D": [],
        "F": []
    });

    useEffect(() => {
        setSeasonQueue(seasonNumArray);
    }, []);

    const onRankingsToggle = (type) => {
        toggleRanking(type);
    }

    const removeFromQueue = (season) => {
        console.log('removing season from queue');
        const updated = [];
        for (var i = 0; i < seasonQueue.length; i++) {
            if (seasonQueue[i] !== season) {
                updated.push(seasonQueue[i]);
            }
        }
        setSeasonQueue(updated);
    }

    const addToQueue = (season, oldTier) => {
        // removes season from previous tier if previously ranked
        const updated = {...ranked}
        if (oldTier !== undefined) {
            const updatedTier = [];
            for (var i = 0; i < updated[oldTier].length; i++) {
                if (updated[oldTier][i] !== season) {
                    updatedTier.push(updated[oldTier][i]);
                }
            }
            updated[oldTier] = updatedTier;
        }
        setRanked(updated);
        // adds season back to Queue
        const updatedQueue = [...seasonQueue];
        updatedQueue.push(season);
        updatedQueue.sort(function(a,b) {return a-b});
        setSeasonQueue(updatedQueue);
    }

    const addToRanked = (season, oldSeason, newTier, oldTier) => {
        console.log('adding season to ranked board');
        const updated = {...ranked}
        // changes nothing if season is dropped back in its original place
        if (season === oldSeason) {
            return;
        } else {
            // removes season from previous tier if previously ranked in another tier OR
            // removes season from current tier if moving to the end of that tier
            if (((oldTier !== undefined) && (oldTier !== newTier)) || ((oldTier !== undefined) && (oldSeason === null))) {
                var updatedOldTier = [];
                for (var i = 0; i < updated[oldTier].length; i++) {
                    if (updated[oldTier][i] !== season) {
                        updatedOldTier.push(updated[oldTier][i]);
                    }
                }
                updated[oldTier] = updatedOldTier;
            }
            // adds season to new tier if placing in occupied tier
            if (oldSeason !== null) {
                var updatedNewTier = [];
                for (var j = 0; j < updated[newTier].length; j++) {
                    const compare = updated[newTier][j];
                    if (compare === season) {
                        continue;
                    }
                    if (compare === oldSeason) {
                        updatedNewTier.push(season, oldSeason);
                        continue;
                    } else {
                        updatedNewTier.push(compare);
                    }
                }
                updated[newTier] = updatedNewTier;
            // adds season to end of tier
            } else {
                updated[newTier].push(season);
            }
            setRanked(updated);
            }
        
    }

    const ContextValue = {
        selectedRanking,
        seasonQueue,
        ranked,
        onRankingsToggle,
        removeFromQueue,
        addToQueue,
        addToRanked
    };

    return (
        <MyRankingsContext.Provider value={ContextValue}>
            <br/>
            <Row className="justify-content-center mx-0">
                <Col lg={11}>
                    <SectionHeader section={"My Rankings"} active={true} />
                </Col>
            </Row>
            <br/>
            <ToggleRankings />
            <Row className="justify-content-center mx-0">
                <Col lg={11}>
                    <RankingSet type={selectedRanking}/>
                </Col>
            </Row>
            <br/>
        </MyRankingsContext.Provider>
    )
}

export default MyRankings;