const initialData = {
    type: "all",
};

export const typeReducer = (state = initialData, action) => {

    switch (action.type) {
        case 'setType':
            {
                return {
                    ...state,
                    type: action.payload
                }
            }
        default:
            return state
    }

}