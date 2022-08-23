import React from 'react';
import Container from 'react-bootstrap/Container';
import { useDrop } from 'react-dnd'
import '../Styles/RankedBoard.css'

const RankedBoard = () => {

    const onDrop = () => {
        console.log('dropping the season');
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'season',
        drop: () => onDrop(),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    return(
        <Container
            ref={drop}
            className="ranked-window">
        </Container>
    )
}

export default RankedBoard;