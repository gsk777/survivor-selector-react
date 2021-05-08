import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tiers from './Tiers';
import Filters from './Filters';
import Results from './Results';
import PlayerSearch from './PlayerSearch';

const Home = () => {

    const [activeSelector, setActiveSelector] = useState("tiers");
    const [selectedTier, setSelectedTier] = useState(4);
    const [filterStatus, setFilterStatus] = useState(
        {
            "Cast Type": {
                "All Newbie": true,
                "All Returnee": true,
                "Mixed": true
            },
            "Final Tribal": {
                "Final 2": true,
                "Final 3": true
            },
            "Starting Tribes": {
                "2": true,
                "3": true,
                "4": true
            },
            "Second Chance": {
                "None": true,
                "Redemption Island": true,
                "Edge of Extinction": true,
                "Outcasts": true
            }
        }
    );
    const [selectedPlayer, setSelectedPlayer] = useState('');

    const resetFilters = () => {
        setFilterStatus(
            {
                "Cast Type": {
                    "All Newbie": true,
                    "All Returnee": true,
                    "Mixed": true
                },
                "Final Tribal": {
                    "Final 2": true,
                    "Final 3": true
                },
                "Starting Tribes": {
                    "2": true,
                    "3": true,
                    "4": true
                },
                "Second Chance": {
                    "None": true,
                    "Redemption Island": true,
                    "Edge of Extinction": true,
                    "Outcasts": true
                }
            }
        );
    }
    
    const onTierClick = (tier) => {
        setSelectedTier(tier);
        resetFilters();
        setActiveSelector("tiers");
    }

    const onFilterClick = (filter, label, status) => {
        setSelectedTier(0);
        setFilterStatus({
            ...filterStatus,
            [filter]: {
                ...filterStatus[filter],
                [label]: (!status)
            }
        });
        setActiveSelector("filters");
    }

    const onPlayerSearchClick = () => {
        setSelectedTier(0);
        resetFilters();
        setActiveSelector("player");
    }

    const onPlayerSelect = (player) => {
        if (player === null) {
            setSelectedPlayer("");
        } else {
            setSelectedPlayer(player.label);
        }
    }

    return (
        <div>
            <Row className="justify-content-center">
                <Col className="col-lg-10 col-12">
                    <Tiers
                        selected={selectedTier}
                        onTierClick={onTierClick}
                        active={(activeSelector === "tiers" ? true : false)}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="col-lg-6 col-md-7 col-12">
                    <Filters
                        filter={filterStatus}
                        onFilterClick={onFilterClick}
                        active={(activeSelector === "filters" ? true : false)}
                    />
                </Col>
                <Col className="col-lg-4 col-md-5 col-12">
                    <PlayerSearch
                        player={selectedPlayer}
                        onPlayerSearchClick={onPlayerSearchClick}
                        onPlayerSelect={onPlayerSelect}
                        active={(activeSelector === "player" ? true : false)}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="col-lg-10 col-md-11 col-12">
                    <Results
                        active={activeSelector}
                        selected={selectedTier}
                        filter={filterStatus}
                        player={selectedPlayer}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Home;