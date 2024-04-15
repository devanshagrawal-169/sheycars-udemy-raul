const initialData = {
    location: "all",
};

export const locationReducer = (state = initialData, action) => {

    switch (action.type) {
        case 'setLocation':
            {
                return {
                    ...state,
                    location: action.payload
                }
            }
        default:
            return state
    }

}