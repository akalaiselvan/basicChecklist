import createContext from './createContext';

const reducer=(state,actions)=>{
    switch(actions.type){
        case 'add':
            console.log(`paylod is  ${actions.payload}`);
            return [...state,{title:actions.payload.title,
                              lists:actions.payload.clist}]
        default:
            return state;
    }
}

const addChecklist=dispatch=>({title,clist})=>{
    console.log(`received title is ${title}`);
    dispatch({type:'add',payload:{title,clist}});
}

export const {Context,Provider}=createContext(reducer,{addChecklist},[]);