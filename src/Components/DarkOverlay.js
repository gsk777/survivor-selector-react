import '../Styles/DarkOverlay.css';

// used by SectionHeader.js to toggle brightness of home page headers
const DarkOverlay = (props) => {
    return (
        <div className={"overlay" + (props.active ? " hide" : "")}></div>
    )
}

export default DarkOverlay;