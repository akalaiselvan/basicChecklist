import createContext from './createContext';
import {database} from '../DB/database';

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
        case 'theme':
            if(state.bgColor==='#071815')
                return {...state,bgColor:'#eaf3f1'}
            else{
                return {...state,bgColor:'#071815'}
            }
        case 'font':
            return {...state,font:actions.payload}    
        case 'removeAll':
            return {...state,list:[]}        
        case 'setInitial':
                console.log('hmm'+JSON.stringify(state.hdr));
                const header=actions.payload.hdr;
                const detail=actions.payload.list;
                const bgColor=actions.payload.misc[0].bgColor;
                const font=actions.payload.misc[0].font;
    
                const hdrList=header.map(hitem=>{
                let hdrListObj={};
                hdrListObj.title=hitem.title,
                hdrListObj.id=hitem.id,
                hdrListObj.lists=detail.filter(item=>{
                    if(item.pid===hitem.id){
                    let listObj={}
                    listObj.id=item.id;
                    listObj.value=item.value;
                    listObj.isSelected=item.isSelected;
                    return listObj
                    }
                });
                return hdrListObj
                });
    
                const stateObj={
                    list:hdrList,
                    bgColor:bgColor,
                    font:font
                }
    
                //console.log('LAST CHANCE : '+JSON.stringify(stateObj));
                return stateObj;      
            case 'setLoad':
                return {...state,reqLoad:false}    
        default:
            return state;
    }
}

const addChecklist=dispatch=>({title,clist})=>{
    dispatch({type:'add',payload:{title,clist}});
}

const switchCheck=dispatch=>(pid,id,value)=>{
    let check=value===true?'true':'false';
    console.log(`Received payoad id : ${pid}, id : ${id}, value :${value}`);
    dispatch({type:'check',payload:{pid:pid,id:id,value:check}});
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

const switchTheme=dispatch=>()=>{
    dispatch({type:'theme'})
}

const switchFonts=dispatch=>(value)=>{
    dispatch({type:'font',payload:value})
}

const removeAll=dispatch=>()=>{
    dispatch({type:'removeAll'});
}


const setReqLoad=dispatch=>()=>{
    dispatch({type:'setLoad'});
}

const setStates=dispatch=>(hdr,list,misc)=>{
    console.log('Setting temp state'+JSON.stringify(hdr));
    dispatch({type:'setInitial',payload:{hdr:hdr,list:list,misc:misc}})
}

export const {Context,Provider}=createContext(reducer,{ addChecklist,
                                                        switchCheck,
                                                        deleteSelected,
                                                        dragged,
                                                        contDrag,
                                                        updateList,
                                                        switchTheme,
                                                        switchFonts,
                                                        removeAll,
                                                        setStates,
                                                        setReqLoad
                                                    },
                                                             {list:[
                                                    // {
                                                    // title:'Title',
                                                    // lists:[{id:1,value:'item',isSelected:false},{id:2,value:'itemw',isSelected:false}],
                                                    // id:123212,
                                                    // },
                                                    // {
                                                    // title:'Second',
                                                    // lists:[{id:3,value:'item3',isSelected:false},{id:4,value:'item4',isSelected:false}],
                                                    // id:123202,
                                                    // },
                                               ],
                                               bgColor:'#071815',
                                               font:'normal',
                                               reqLoad:true
                                            }                                                   
                                                   );



                                            //        {list:[
                                            //         {
                                            //         title:'Title',
                                            //         lists:[{id:1,value:'item',isSelected:false},{id:2,value:'itemw',isSelected:false}],
                                            //         id:123212,
                                            //         },
                                            //         {
                                            //         title:'Second',
                                            //         lists:[{id:3,value:'item3',isSelected:false},{id:4,value:'item4',isSelected:false}],
                                            //         id:123202,
                                            //         },
                                            //    ],
                                            //    bgColor:'#071815',
                                            //    font:'normal'
                                            // }