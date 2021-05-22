import React from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import '../Styles/SelectWatchlist.css';

const SelectWatchlist = (props) => {

    const watchlists = [
        {value: "All 40", label: "All 40"},
        {value: "Keep the Scraps", label: "Keep the Scraps"},
        {value: "History of Survivor", label: "History of Survivor"},
        {value: "Only the Best", label: "Only the Best"}
    ];

    return (
        <Form>
            <Row>
                <Col xs={8}>
                    <Select
                        className="wl-select"
                        placeholder={"Select a watchlist..."}
                        defaultValue={props.list}
                        isSearchable={false}
                        options={watchlists}
                        onChange={props.onListSelect}
                    />
                </Col>
                <Col xs={4} className="d-flex align-items-center">
                    <Button
                        block
                        size="sm"
                        variant="secondary"
                        onClick={props.onListSubmit}
                    >
                    Update Watchlist
                    </Button>
                </Col>
            </Row>
            
        </Form>
    )
}

export default SelectWatchlist;