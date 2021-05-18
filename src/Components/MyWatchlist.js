import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SectionHeader from './SectionHeader';
import SelectWatchlist from './SelectWatchlist';
import WatchlistInfo from './WatchlistInfo';
import WatchlistWindow from './WatchlistWindow';
import ToggleInactive from './ToggleInactive';

import seasonData, { numSeasons } from '../season-data';

const MyWatchlist = () => {

    const [selectedList, setSelectedList] = useState("empty");
    const [userWL, setUserWL] = useState({});
    const [hideInactive, toggleHideInactive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:4000/watchlist");
            setUserWL(response.data);
        }
        fetchData();
    }, [])

    const onListSelect = (list) => {
        setSelectedList(list.value);
    }

    async function updateWatchlist(list) {
        const updatedWL = {...userWL};
        switch (list) {
            case "All 40":
                for (var i = 1; i <= numSeasons; i++) {
                    updatedWL[i] = "active";
                }
                break;
            case "Keep the Scraps":
                for (var i = 1; i <= numSeasons; i++) {
                    if (seasonData.get(i).tier <= 3) {
                        updatedWL[i] = "active";
                    } else {
                        updatedWL[i] = "inactive";
                    }
                }
                break;
            case "History of Survivor":
                for (var i = 1; i <= numSeasons; i++) {
                    if (seasonData.get(i).tier <= 2) {
                        updatedWL[i] = "active";
                    } else {
                        updatedWL[i] = "inactive";
                    }
                }
                break;
            case "Only the Best":
                for (var i = 1; i <= numSeasons; i++) {
                    if (seasonData.get(i).tier === 1) {
                        updatedWL[i] = "active";
                    } else {
                        updatedWL[i] = "inactive";
                    }
                }
                break;
        }
        setUserWL({...updatedWL});
        await axios.put('http://localhost:4000/watchlist', {...updatedWL});
    }

    const onListSubmit = () => {
        updateWatchlist(selectedList);
    }

    const onInactiveToggle = () => {
        toggleHideInactive(!hideInactive);
    }

    async function onSeasonWatchedToggle(season) {
        const updatedWL = {...userWL};
        switch (userWL[season]) {
            case "active":
                updatedWL[season] = "watched";
                break;
            case "inactive":
                break;
            case "watched":
                updatedWL[season] = "active";
                break;
        }
        setUserWL({...updatedWL})
        await axios.put('http://localhost:4000/watchlist', {...updatedWL});
    }

    async function onSeasonActiveToggle(season) {
        const updatedWL = {...userWL};
        switch (userWL[season]) {
            case "active":
                updatedWL[season] = "inactive";
                break;
            case "inactive":
                updatedWL[season] = "active";
                break;
            case "watched":
                updatedWL[season] = "inactive";
                break;
        }
        setUserWL({...updatedWL});
        await axios.put('http://localhost:4000/watchlist', {...updatedWL});
    }

    return (
        <>
        <br/>
            <Row className="justify-content-center mx-0">
                <Col lg={10}>
                    <SectionHeader section={"My Watchlist"} active={true} />
                </Col>
            </Row>
            <Row className="justify-content-center mx-0">
                <Col xs={11} sm={10} md={8} lg={6} className="pt-3">
                    <SelectWatchlist
                        onListSelect={onListSelect}
                        onListSubmit={onListSubmit}
                        list={selectedList}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center mx-0">
                <Col xs={8} lg={6} className="pt-3">
                    <WatchlistInfo watchlist={selectedList}/>
                </Col>
            </Row>
            <Row className="justify-content-center mx-0">
                <Col md={10} lg={8} xl={11}>
                    <ToggleInactive
                        checked={hideInactive}
                        toggleHideInactive={onInactiveToggle}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center pt-1 mx-0">
                <Col md={10} lg={8} xl={11}>
                    <WatchlistWindow
                        userWL={userWL}
                        hideInactive={hideInactive}
                        onSeasonWatchedToggle={onSeasonWatchedToggle}
                        onSeasonActiveToggle={onSeasonActiveToggle}
                    />
                </Col>
            </Row>
            <br/>
            <br/>
        </>
    )
};

export default MyWatchlist;
