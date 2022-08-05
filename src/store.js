import { createStore } from 'redux';

const initialState = {
    update: { updating: false }
}

const store = createStore((state = initialState, action) => {

    switch (action.type) {
        case "UPDATING":
            return { ...state, update: { updating: true } };
            // break;

        case "UPDATED":
            return { ...state, update: { updating: false } };
            // break;

        default:
            return state;
            // break;
    }
})

export default store;