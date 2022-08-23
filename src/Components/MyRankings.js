import React, { useState } from 'react';
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

    const onRankingsToggle = (type) => {
        console.log('toggling rankings type');
        toggleRanking(type);
    }

    const ContextValue = {
        selectedRanking,
        seasonQueue,
        onRankingsToggle
    };

    return (
        <MyRankingsContext.Provider value={ContextValue}>
            <br/>
            <Row className="justify-content-center mx-0">
                <Col lg={10}>
                    <SectionHeader section={"My Rankings"} active={true} />
                </Col>
            </Row>
            <br/>
            <ToggleRankings />
            <Row className="justify-content-center mx-0">
                <Col lg={10}>
                    <RankingSet type={selectedRanking}/>
                </Col>
            </Row>
            <br/>
        </MyRankingsContext.Provider>
    )
}

export default MyRankings;