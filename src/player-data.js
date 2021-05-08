import seasonData, { numSeasons } from './season-data';

const playerList = [];
const addedPlayers = [];

function addCast(cast) {
    cast.forEach(player => {
        if (!addedPlayers.includes(player)) {
            playerList.push({ value: player, label: player });
            addedPlayers.push(player);
        }
    });
}

for (var i = 1; i <= numSeasons; i++) {
    addCast(seasonData.get(i).seasonCast);
};


export default playerList;