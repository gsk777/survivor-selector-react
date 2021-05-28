export function filterReducer(state, action) {
    switch (action.type) {
        case 'update':
            return {
                ...state,
                [action.filter]: {
                    ...state[action.filter],
                    [action.label]: (!action.status)
                }
            };
        case 'reset':
            return {
                "Cast Type": {
                    "All Newbie": true,
                    "All Returnee": true,
                    "Mixed": true
                },
                "Final Tribal": {
                    "Final 2": true,
                    "Final 3": true
                },
                "Starting Tribes": {
                    "2": true,
                    "3": true,
                    "4": true
                },
                "Second Chance": {
                    "None": true,
                    "Redemption Island": true,
                    "Edge of Extinction": true,
                    "Outcasts": true
                }
            };
        default:
            throw new Error();
    }
}