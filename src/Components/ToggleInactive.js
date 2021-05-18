import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const ToggleInactive = (props) => {
    return (
        <Container fluid>
            <Row className="justify-content-end pt-4 pr-5">
                <label className="cursor text-light">
                    <input
                        type="checkbox"
                        className="cursor mr-2"
                        checked={props.checked}
                        onChange={props.toggleHideInactive}
                    />
                    Hide Inactive
                </label>
            </Row>
        </Container>
    )
}

export default ToggleInactive;