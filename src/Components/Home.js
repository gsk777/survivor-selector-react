import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tiers from './Tiers';
import Filters from './Filters';
import Results from './Results';
import PlayerSearch from './PlayerSearch';
import ViewToggle from './ViewToggle';

export const HomeContext = React.createContext();

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
        if (activeSelector === "filters") {
            resetFilters();
        };
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

    const ContextValue = {
        activeSelector,
        selectedTier,
        filterStatus,
        selectedPlayer,
        listView,
        onTierClick,
        onFilterClick
    };

    return (
        <HomeContext.Provider value={ ContextValue }>
            <div>
                <br/>
                <Row className="justify-content-center mx-0">
                    <Col lg={10}>
                        <Tiers/>
                    </Col>
                </Row>
                <Row className="justify-content-center mx-0">
                    <Col md={7} lg={6}>
                        <Filters/>
                    </Col>
                    <Col md={5} lg={4}>
                        <PlayerSearch
                            onPlayerSearchClick={onPlayerSearchClick}
                            onPlayerSelect={onPlayerSelect}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center pt-1 pb-2 mx-0">
                    <Col xs={12} md={12} lg={10}>
                        <ViewToggle
                            onToggle={onViewToggle}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center mx-0">
                    <Col xs={12} md={12} lg={10}>
                        <Results/>
                    </Col>
                </Row>
            </div>
        </HomeContext.Provider>
    );
}

export default Home;