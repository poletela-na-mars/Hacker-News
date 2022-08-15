import { createStore } from "redux";

const initialState = {
    update: { updating: false }
};

const store = createStore((state = initialState, action) => {

    switch (action.type) {
        case "UPDATED_MANUALLY":
            return { ...state, update: { updating: true } };
            break;

        default:
            return state;
            break;
    }
});

export default store;