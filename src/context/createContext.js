import React,{useReducer} from 'react';

export default (reducer,actions,initialValue)=>{

    const Context = React.createContext();

    const Provider=({children})=>{

        const [state,dispatch]=useReducer(reducer,initialValue);

        const methods={};

        for(let key in actions){
            methods[key]=actions[key](dispatch);
        }

        return<Context.Provider value={{state,...methods}}>
            {children}
        </Context.Provider>
    }
    return {Context,Provider}
}