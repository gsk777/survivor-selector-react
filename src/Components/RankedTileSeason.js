import React, { useContext } from 'react';
import { useDrop } from 'react-dnd'

import QueueTileSeason from './QueueTileSeason';

import { MyRankingsContext } from './MyRankings';

const RankedTileSeason = (props) => {

    const context = useContext(MyRankingsContext);

    const onDrop = (season, oldTier) => {
        context.removeFromQueue(season);
        context.addToRanked(season, props.season, props.tier, oldTier);
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'season',
        drop: monitor => {
            onDrop(monitor.id, monitor.tier);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }),[context.seasonQueue, context.ranked]);

    return (
        <div ref={drop}>
            <QueueTileSeason season={props.season} tier={props.tier}/>
        </div>
    )
}

export default RankedTileSeason;