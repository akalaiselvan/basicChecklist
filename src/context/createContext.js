import React,{useReducer,useEffect,useState} from 'react';
import {database} from '../DB/database';
export default (reducer,actions,initialValue)=>{

    const Context = React.createContext();

    const Provider=({children})=>{

        const [state,dispatch]=useReducer(reducer,initialValue);

        const methods={};


        const [hdr,setHdr]=useState([]);
        const [list,setList]=useState([]);
        const [misc,setMisc]=useState([]);
        const [isLoaded,setIsLoaded]=useState(false);

        useEffect(()=>{
             refreshState();
        },[]);

        const refreshState= ()=>{
            database.getLists('Select * from list_hdr',setHdr);
            database.getLists('Select * from list_dtl',setList);
            database.getLists('Select * from app_prop',setMisc);
            setIsLoaded(true);
        }

    

        for(let key in actions){
            methods[key]=actions[key](dispatch);
        }

        return<Context.Provider value={{state,...methods,hdr,list,misc,isLoaded}}>
            {children}
        </Context.Provider>
    }
    return {Context,Provider}
}