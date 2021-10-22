import React, { useContext } from 'react';
import { MyWLContext } from './MyWatchlist';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// used by MyWatchlist.js to toggle the display of inactive seasons
const ToggleInactive = (props) => {

    const context = useContext(MyWLContext);

    return (
        <Container fluid>
            <Row className="justify-content-end pt-4 pr-5">
                <label className="cursor text-light">
                    <input
                        type="checkbox"
                        className="cursor mr-2"
                        checked={context.hideInactive}
                        onChange={props.toggleHideInactive}
                    />
                    Hide Inactive
                </label>
            </Row>
        </Container>
    )
}

export default ToggleInactive;