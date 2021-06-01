import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SectionHeader from './SectionHeader';
import SelectWatchlist from './SelectWatchlist';
import WatchlistInfo from './WatchlistInfo';
import WatchlistWindow from './WatchlistWindow';
import ToggleInactive from './ToggleInactive';
import { userWLReducer } from '../Reducers/userWLReducer';

export const MyWLContext = React.createContext();

const MyWatchlist = () => {

    const [selectedList, setSelectedList] = useState("empty");
    const [userWL, dispatch] = useReducer(userWLReducer, {});
    const [hideInactive, toggleHideInactive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:4000/watchlist");
            dispatch({ type: "SET", data: response.data })
        }
        fetchData();
    }, [])

    const onListSelect = (list) => {
        setSelectedList(list.value);
    }

    const onListSubmit = () => {
        dispatch({ type: "UPDATE", list: selectedList });
    }

    const onInactiveToggle = () => {
        toggleHideInactive(!hideInactive);
    }

    const onSeasonWatchedToggle = (season) => {
        dispatch({ type: "TOGGLE_WATCHED", season });
    }

    const onSeasonActiveToggle = (season) => {
        dispatch({ type: "TOGGLE_ACTIVE", season });
    }

    const ContextValue = {
        selectedList,
        userWL,
        hideInactive,
        onSeasonWatchedToggle,
        onSeasonActiveToggle
    };

    return (
        <MyWLContext.Provider value={ ContextValue }>
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
                    />
                </Col>
            </Row>
            <Row className="justify-content-center mx-0">
                <Col xs={8} lg={6} className="pt-3">
                    <WatchlistInfo/>
                </Col>
            </Row>
            <Row className="justify-content-center mx-0">
                <Col md={10} lg={8} xl={11}>
                    <ToggleInactive
                        toggleHideInactive={onInactiveToggle}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center pt-1 mx-0">
                <Col md={10} lg={8} xl={11}>
                    <WatchlistWindow/>
                </Col>
            </Row>
            <br/>
            <br/>
        </MyWLContext.Provider>
    )
};

export default MyWatchlist;
