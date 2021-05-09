import createContext from './createContext';

const reducer=(state,actions)=>{
    switch(actions.type){
        case 'add':
            return {...state,list:[...state.list,{title:actions.payload.title,
                              lists:actions.payload.clist,
                              id:Math.round(new Date().getTime()/1000),
                              isSelected:false}]}
        case 'check':
                 let temp=[...state.list];
                 let p=temp.findIndex(p=>p.id===actions.payload.pid);
                 let c=temp[p].lists.findIndex(c=>c.id===actions.payload.id)
                 temp[p].lists[c].isSelected=actions.payload.value;
                 return {...state,list:temp};
        case 'deleteSelected':
            return {...state,list:state.list.filter(m=>m.id!==actions.payload)}

        case 'del_key':
             if(state.list.find(m=>m.isSelected)){
                 return {...state,showDelete:true}
                }else{
                    return {...state,showDelete:false}
                };
        case 'dragged':
            return {...state,list:actions.payload} 
        case 'cont_drag':
            return {...state,list:state.list.map(item=>{
                if(item.id===actions.payload.id){
                    return{...item,lists:actions.payload.data}
                }else{
                    return item;
                }
            })};     
        case 'update':
            const lis=state.list;
            const item=lis.find(f=>f.id===actions.payload.id)
            item.title=actions.payload.title
            const index=lis.findIndex(f=>f.id===actions.payload.id)
            lis[index].lists=actions.payload.lists;
            return {...state,list:lis}

        default:
            return state;
    }
}

const addChecklist=dispatch=>({title,clist})=>{
    dispatch({type:'add',payload:{title,clist}});
}

const switchCheck=dispatch=>(pid,id,value)=>{
    console.log(`Received payoad id : ${pid}, id : ${id}, value :${value}`);
    dispatch({type:'check',payload:{pid:pid,id:id,value:value}});
}

const deleteSelected=dispatch=>(id)=>{
    dispatch({type:'deleteSelected',payload:id});
}

const dragged=dispatch=>(data)=>{
    dispatch({type:'dragged',payload:data.data})
}

const contDrag=dispatch=>(id,data)=>{
    dispatch({type:'cont_drag',payload:{data:data.data,id:id}});
}

const updateList=dispatch=>(id,clist,title)=>{
    dispatch({type:'update',payload:{id:id,lists:clist,title:title}});
}

const refresh=dispatch=>()=>{
    console.log('refreshed');
    dispatch({type:'refresh'})
}


export const {Context,Provider}=createContext(reducer,{ addChecklist,
                                                        switchCheck,
                                                        deleteSelected,
                                                        dragged,
                                                        contDrag,
                                                        updateList,
                                                        refresh
                                                    },
                                                    {list:[
                                                        {
                                                        title:'Title',
                                                        lists:[{id:1,value:'item',isSelected:false},{id:2,value:'itemw',isSelected:false}],
                                                        id:123212,
                                                        },
                                                        {
                                                        title:'Second',
                                                        lists:[{id:3,value:'item3',isSelected:false},{id:4,value:'item4',isSelected:false}],
                                                        id:123202,
                                                        },
                                                   ]});