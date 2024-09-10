import Cookies from "js-cookie"
const initialState={
    data:{},
    user:{}
}

export default function RootReducer(state=initialState,action)
{
    switch(action.type)
    {
        case 'ADD_PRODUCT':
            state.data[action.payload[0]]=action.payload[1]
            console.log("RRRRRRRRRRRRRRRRRRRRR",state.data)
            Cookies.set('CART',JSON.stringify(state.data),{expires:365})
            return{data:state.data,user:state.user}

            case 'ADD_USER':
                state.user[action.payload[0]]=action.payload[1]
                console.log("xxxxxxxxx",state.data)
                return{data:state.data,user:state.user}

         case 'Edit_Task':
             state.data[action.payload[0]]=action.payload[1]
            console.log(state.data)
            return{data:state.data,user:state.user}
               
         case 'DELETE_PRODUCT':
               delete state.data[action.payload[0]]
               console.log(state.data)
            Cookies.set('CART',JSON.stringify(state.data),{expires:365})
               return{data:state.data,user:state.user}      
                   
            default:
                return{data:state.data,user:state.user}
               
             
    }
}