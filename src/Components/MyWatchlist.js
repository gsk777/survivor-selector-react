import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router';
import SectionHeader from './SectionHeader';
import SelectWatchlist from './SelectWatchlist';
import WatchlistInfo from './WatchlistInfo';
import WatchlistWindow from './WatchlistWindow';
import ToggleInactive from './ToggleInactive';
import { userWLReducer } from '../Reducers/userWLReducer';

import { UserContext } from '../App';

export const MyWLContext = React.createContext();

// User Watchlist page route used by Main.js
const MyWatchlist = () => {

    const context = useContext(UserContext);

    const [selectedList, setSelectedList] = useState("empty");
    const [userWL, dispatch] = useReducer(userWLReducer, {});
    const [hideInactive, toggleHideInactive] = useState(false);

    // pull user data on initial render
    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching data...');
            try {
                const response = await axios.get("http://localhost:4000/db", {
                    headers: {
                        "Authorization": context.token.data
                    }
                });
                dispatch({ type: "SET", data: response.data })
            } catch (error) {
                console.log('token not verified');
                console.log(error);
                localStorage.removeItem('token');
                context.setToken(undefined);
            }
        }
        fetchData();
    }, [context]);

    // update user data after userWL state changes
    useEffect(() => {
        const saveData = async () => {
            console.log('saving data...');
            try {
                await axios.put('http://localhost:4000/db', {...userWL}, {
                    headers: {
                        "Authorization": context.token.data
                    }
                });
            } catch (error) {
                console.log(error);
                localStorage.removeItem('token');
                context.setToken(undefined);
            }
        }
        if (Object.keys(userWL).length > 0) {
            saveData();
        }
    }, [userWL, context]);

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
        dispatch({ type: "TOGGLE_WATCHED", season: season });
    }

    const onSeasonActiveToggle = (season) => {
        dispatch({ type: "TOGGLE_ACTIVE", season: season });
    }

    const ContextValue = {
        selectedList,
        userWL,
        hideInactive,
        onSeasonWatchedToggle,
        onSeasonActiveToggle
    };

    if (context.token === undefined) {
        return <Redirect to='/login' />
    }

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
