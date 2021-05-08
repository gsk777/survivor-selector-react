import '../Styles/DarkOverlay.css';

const DarkOverlay = (props) => {
    return (
        <div className={"overlay" + (props.active ? " hide" : "")}></div>
    )
}

export default DarkOverlay;