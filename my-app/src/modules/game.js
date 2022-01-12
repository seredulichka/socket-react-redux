export const updateFieldAC = (json, name) => ({ type: 'SET_FIELD', data: json, name });


const initialState = { connected: false,
                       username:'',
                       recipient:'',
                       messages:[],
                       textMessage:'',
                       
};

export const chatReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_FIELD':
        if(action.name === 'messages'){
            return { ...state, 
                [action.name]: [action.data, ...state.messages]
            };
        }
      return { ...state, 
            [action.name]: action.data
        };
    default:
      return state;
  }
}