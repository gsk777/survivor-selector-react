import seasonData, { numSeasons } from '../season-data';
import axios from 'axios';

export function userWLReducer(state, action) {
    const buildList = (state, list) => {
        const updatedWL = {...state};
        switch (list) {
            case "All 40":
                for (var a = 1; a <= numSeasons; a++) {
                    updatedWL[a] = "active";
                }
                break;
            case "Keep the Scraps":
                for (var k = 1; k <= numSeasons; k++) {
                    if (seasonData.get(k).tier <= 3) {
                        updatedWL[k] = "active";
                    } else {
                        updatedWL[k] = "inactive";
                    }
                }
                break;
            case "History of Survivor":
                for (var h = 1; h <= numSeasons; h++) {
                    if (seasonData.get(h).tier <= 2) {
                        updatedWL[h] = "active";
                    } else {
                        updatedWL[h] = "inactive";
                    }
                }
                break;
            case "Only the Best":
                for (var i = 1; i <= numSeasons; i++) {
                    if (seasonData.get(i).tier === 1) {
                        updatedWL[i] = "active";
                    } else {
                        updatedWL[i] = "inactive";
                    }
                }
                break;
            default:
                throw new Error('Unexpected value for selected list');
        }
        const updateData = async () => {
            await axios.put('http://localhost:4000/watchlist', {...updatedWL});
        }
        updateData();
        return updatedWL;
    }
    const toggleWatched = (state, season) => {
        const updatedWL = {...state};
        switch (state[season]) {
            case "active":
                updatedWL[season] = "watched";
                break;
            case "inactive":
                break;
            case "watched":
                updatedWL[season] = "active";
                break;
            default:
                throw new Error('Unexpected value for userWL season status');
        }
        const updateData = async () => {
            await axios.put('http://localhost:4000/watchlist', {...updatedWL});
        }
        updateData();
        return updatedWL;
    }
    const toggleActive = (state, season) => {
        const updatedWL = {...state};
        switch (state[season]) {
            case "active":
                updatedWL[season] = "inactive";
                break;
            case "inactive":
                updatedWL[season] = "active";
                break;
            case "watched":
                updatedWL[season] = "inactive";
                break;
            default:
                throw new Error('Unexpected value for userWL season status');
        }
        const updateData = async () => {
            await axios.put('http://localhost:4000/watchlist', {...updatedWL});
        }
        updateData();
        return updatedWL;
    }
    
    switch (action.type) {
        case 'SET':
            return action.data;
        case 'UPDATE':
            return buildList(state, action.list);
        case 'TOGGLE_WATCHED':
            return toggleWatched(state, action.season);
        case 'TOGGLE_ACTIVE':
            return toggleActive(state, action.season);
        default:
            throw new Error();
    }
}