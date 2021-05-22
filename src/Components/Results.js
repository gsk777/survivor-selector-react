import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Season from './Season';
import SeasonList from './SeasonList';

import seasonData, { numSeasons } from '../season-data';

const Results = (props) => {

    function activeFilterList(status) {
        const activeFilters = []
        if (status['Cast Type']['All Newbie']) {
            activeFilters.push('newbie');
        }
        if (status['Cast Type']['All Returnee']) {
            activeFilters.push('returnee');
        }
        if (status['Cast Type']['Mixed']) {
            activeFilters.push('mixed');
        }
        if (status['Final Tribal']['Final 2']) {
            activeFilters.push(2);
        }
        if (status['Final Tribal']['Final 3']) {
            activeFilters.push(3);
        }
        if (status['Starting Tribes']['2']) {
            activeFilters.push('two');
        }
        if (status['Starting Tribes']['3']) {
            activeFilters.push('three');
        }
        if (status['Starting Tribes']['4']) {
            activeFilters.push('four');
        }
        if (status['Second Chance']['None']) {
            activeFilters.push('none');
        }
        if (status['Second Chance']['Redemption Island']) {
            activeFilters.push('redemption');
        }
        if (status['Second Chance']['Edge of Extinction']) {
            activeFilters.push('edge');
        }
        if (status['Second Chance']['Outcasts']) {
            activeFilters.push('outcast');
        }
        return (activeFilters);
    }
    
    const seasonList = [];
    switch (props.active) {
        case "tiers":
            for (var i = 1; i <= numSeasons; i++) {
                if (seasonData.get(i).tier <= props.selected) {
                    seasonList.push(i);
                }
            };
            break;
        case "filters":
            const activeFilters = activeFilterList(props.filter);
            for (var i = 1; i <= numSeasons; i++) {
                if ((activeFilters.includes(seasonData.get(i).castType)) &&
                    (activeFilters.includes(seasonData.get(i).finalTribal)) &&
                    (activeFilters.includes(seasonData.get(i).numTribes)) &&
                    (activeFilters.includes(seasonData.get(i).secondChance))) {
                    seasonList.push(i);
                }
            };
            break;
        case "player":
            for (var i = 1; i <= numSeasons; i++) {
                if (seasonData.get(i).seasonCast.includes(props.player)) {
                    seasonList.push(i);
                }
            };
            break;
    }

    const toggleShowWinner = (season) => {
        seasonData.set(season, {
            ...seasonData.get(season),
            showWinner: (!seasonData.get(season).showWinner)
        });
    }

    return (
        <>
            <Container fluid className={(props.view === "tiled") ? "" : "d-none"}>
                <Row noGutters className="justify-content-center" xs={2} sm={3} md={4} lg={5} xl={6}>
                    {seasonList.map(season => (
                        <Col key={season}>
                            <Season
                                key={season.toString()}
                                seasonNum={season}
                                image={seasonData.get(season).seasonLogo}
                                title={seasonData.get(season).seasonName}
                                winner={seasonData.get(season).seasonWinner}
                                color={seasonData.get(season).seasonColor}
                                showWinner={seasonData.get(season).showWinner}
                                onClick={toggleShowWinner}
                            />
                        </Col>
                    ))}
                </Row>
                <br/>
                <br/>
            </Container>
            <Container fluid className={(props.view === "list") ? "" : "d-none"}>
                <Row>
                    <Col md={6} className="px-2 pl-md-2 pr-md-1 px-lg-2">
                        <Row>
                            {(seasonList.slice(0, (Math.round(seasonList.length / 2)))).map(season => (
                                <Col xs={12} key={season} className="pb-1">
                                    <SeasonList
                                        key={season.toString()}
                                        seasonNum={season}
                                        image={seasonData.get(season).seasonLogo}
                                        title={seasonData.get(season).seasonName}
                                        winner={seasonData.get(season).seasonWinner}
                                        color={seasonData.get(season).seasonColor}
                                        showWinner={seasonData.get(season).showWinner}
                                        onClick={toggleShowWinner}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col md={6} className="px-2 pl-md-1 pr-md-2 px-lg-2">
                        <Row>
                            {(seasonList.slice((Math.round(seasonList.length / 2)), seasonList.length)).map(season => (
                                <Col xs={12} key={season} className="pb-1">
                                    <SeasonList
                                        key={season.toString()}
                                        seasonNum={season}
                                        image={seasonData.get(season).seasonLogo}
                                        title={seasonData.get(season).seasonName}
                                        winner={seasonData.get(season).seasonWinner}
                                        color={seasonData.get(season).seasonColor}
                                        showWinner={seasonData.get(season).showWinner}
                                        onClick={toggleShowWinner}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
                <br/>
                <br/>
            </Container>
        </>
    );
}

export default Results;