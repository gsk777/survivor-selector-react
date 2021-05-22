import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';

import '../Styles/TierButton.css';

const TierButton = (props) => {

    const [inHover, setHover] = useState(false);

    const tierOutlines = {
        1: "tier-one-outline",
        2: "tier-two-outline",
        3: "tier-three-outline",
        4: "tier-four-outline"
    };

    return (
        <Col  xs={6} md={3} className="p-1">
            <img
                className={ "w-100 " + (props.selected || inHover ? tierOutlines[props.tier] : "tier-outline-off") }
                src={props.image}
                onClick={() => props.onClick(props.tier)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            />
        </Col>
    );
}

export default TierButton;