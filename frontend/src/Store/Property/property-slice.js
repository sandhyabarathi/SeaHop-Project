import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
    //slice name
    name:"property",

    initialState:{
        properties:[],
        totalProperties:0,
        searchParams: {}, //Parameters used to search
        error:null,
        loading:false,
    },

    //reducers functions to hanfle different functions
    reducers:{
        getRequest(state){
            state.loading=true;
        },
        getProperties(state,action){
            state.properties = action.payload.data;
            state.totalProperties = action.payload.all_properties;
            state.loading = false;
        },
        //Action to search for properties
        updateSearchParams: (state, action) => {
            state.searchParams =
              Object.keys(action.payload).length === 0
                ? {}
                : {
                    ...state.searchParams,
                    ...action.payload,
                  };
          },

        //Action to update error state
        getErrors(state,action){
            state.error = action.payload;
        }

    },
})

export const propertyAction = propertySlice.actions;

export default propertySlice