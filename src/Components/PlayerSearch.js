import React, { useContext } from 'react';
import { HomeContext } from './Home';
import { Container } from 'react-bootstrap';
import Select from 'react-select';

import SectionHeader from './SectionHeader';
import '../Styles/PlayerSearch.css';
import playerList from '../player-data';

const PlayerSearch = (props) => {

    const context = useContext(HomeContext);

    const customStyles = {
        valueContainer: (styles) => ({
            ...styles,
            cursor: 'text',
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            cursor: 'pointer',
        }),
        option: (styles) => ({
            ...styles,
            cursor: 'pointer',
        })
    }

    return (
        <div className={"h-100" + (props.active ? " player-active" : "")} >
            <SectionHeader section={"Player Search"} active={props.active} />
            <Container className="col-10">
                <Select
                    className="search-box pt-3 pb-4"
                    styles={customStyles}
                    defaultValue={context.selectedPlayer}
                    isSearchable={true}
                    isClearable={true}
                    maxMenuHeight={150}
                    options={playerList}
                    onChange={props.onPlayerSelect}
                    onMenuOpen={props.onPlayerSearchClick}
                />
                <br></br>
            </Container>
        </div>
    )
}

export default PlayerSearch;