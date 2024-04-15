const initialData = {
    cars : [],
    location:"",

};

export const carsReducer = (state=initialData , action)=>{

     switch(action.type)
     {
         case 'GET_ALL_CARS' : {
             return{
                 ...state,
                 cars : action.payload
             }
            }
         case 'setLocation':{
            return {
                ...state,
                location:action.payload
            }
         }
         
         default:return state
     }

}

