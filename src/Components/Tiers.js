import React from 'react';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import TierButton from './TierButton';
import SectionHeader from './SectionHeader';
import '../Styles/Tiers.css';

import tier_one from '../Images/Tier One.png';
import tier_one_fade from '../Images/Tier One Fade.png';
import tier_two from '../Images/Tier Two.png';
import tier_two_fade from '../Images/Tier Two Fade.png';
import tier_three from '../Images/Tier Three.png';
import tier_three_fade from '../Images/Tier Three Fade.png';
import tier_four from '../Images/Tier Four.png';
import tier_four_fade from '../Images/Tier Four Fade.png';

const tiersData = new Map();

tiersData.set(1, {
    selected: true,
    imageOn: tier_one,
    imageOff: tier_one_fade
});
tiersData.set(2, {
    selected: false,
    imageOn: tier_two,
    imageOff: tier_two_fade
});
tiersData.set(3, {
    selected: false,
    imageOn: tier_three,
    imageOff: tier_three_fade
});
tiersData.set(4, {
    selected: false,
    imageOn: tier_four,
    imageOff: tier_four_fade
});

const buildTierImages = (tier) => {
    const imageList = []
    for (var i = 1; i <= tiersData.size; i++) {
        if (i === tier) {
            imageList.push(tiersData.get(i).imageOn);
            tiersData.set(i, {
                ...tiersData.get(i),
                selected: true
            });
        } else {
            imageList.push(tiersData.get(i).imageOff);
            tiersData.set(i, {
                ...tiersData.get(i),
                selected: false
            });
        }
    }
    return imageList;
}

const Tiers = (props) => {

    const tierImages = buildTierImages(props.selected);
    const tiersList = []
    for (var i = tiersData.size; i > 0; i--) {
        tiersList.push(i);
    }

    return (
        <>
            <SectionHeader section={"Watchlists"} active={props.active} />
            <Container fluid className={props.active ? "tiers-active" : ""} >
                <Container className="py-4">
                    <Row noGutters>
                        {tiersList.map(t => (
                            <TierButton
                                key={t.toString()}
                                tier={t}
                                image={tierImages[t-1]}
                                selected={tiersData.get(t).selected}
                                onClick={props.onTierClick}
                            />
                        ))}
                    </Row>
                </Container>
                <br/>
                <br/>
            </Container>
        </>
    );
}

export default Tiers;