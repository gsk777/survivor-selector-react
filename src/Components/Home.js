import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tiers from './Tiers';
import Filters from './Filters';
import Results from './Results';
import PlayerSearch from './PlayerSearch';
import ViewToggle from './ViewToggle';

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
    const [listView, setListView] = useState("tiled");

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

    const onViewToggle = (view) => {
        if (view !== listView) {
            setListView(view);
        }
    }

    return (
        <div>
            <br/>
            <Row className="justify-content-center">
                <Col lg={10}>
                    <Tiers
                        selected={selectedTier}
                        onTierClick={onTierClick}
                        active={(activeSelector === "tiers" ? true : false)}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={7} lg={6}>
                    <Filters
                        filter={filterStatus}
                        onFilterClick={onFilterClick}
                        active={(activeSelector === "filters" ? true : false)}
                    />
                </Col>
                <Col md={5} lg={4}>
                    <PlayerSearch
                        player={selectedPlayer}
                        onPlayerSearchClick={onPlayerSearchClick}
                        onPlayerSelect={onPlayerSelect}
                        active={(activeSelector === "player" ? true : false)}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center pb-2">
                <Col xs={12} md={12} lg={10}>
                    <ViewToggle
                        listView={listView}
                        onToggle={onViewToggle}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={10}>
                    <Results
                        active={activeSelector}
                        selected={selectedTier}
                        filter={filterStatus}
                        player={selectedPlayer}
                        view={listView}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Home;