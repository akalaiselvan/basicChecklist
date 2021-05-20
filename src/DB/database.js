import * as SQLite from "expo-sqlite"
const db = SQLite.openDatabase('CList.db')

  async function loadDataAsync() {
    try {
      // //await database.dropDatabaseTablesAsync()
      // insertQry("insert into list_hdr values (1,'List header1')");
      // insertQry("insert into list_hdr values (2,'List header2')");
      // insertQry("insert into list_dtl values (1,1,'Dtl1','true')");
      // insertQry("insert into list_dtl values (1,2,'Dtl2','false')");
      // insertQry("insert into list_dtl values (2,1,'Dtl1','false')");
      // insertQry("insert into list_dtl values (2,2,'Dtl2','true')");
      // insertQry("insert into app_prop values ('blue','normal')");
      // //await setupDatabaseAsync('create table IF NOT EXISTS list_hdr ( id integer, title varchar(100));');
      //await setupDatabaseAsync('create table IF NOT EXISTS list_dtl ( pid integer, id integer, value varchar(100),isSelected varchar(10));');
      //await setupDatabaseAsync('create table IF NOT EXISTS app_prop (bgColor varchar(20),font varchar(50));')
      ////await database.setupUsersAsync()
    } catch (e) {
      console.warn(e);
    }
  }

const getUsers = (setUserFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from users',
        [],
        (_, { rows: { _array } }) => {
          setUserFunc(_array)
        }
      );
    },
    (t, error) => { console.log("db error load users"); 
    console.log('err is '+error) 
    console.log('err1 is '+t) 
  },
    (_t, _success) => { console.log("loaded users")}
  );
}


const dropDatabaseTablesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'drop table users',
        [],
        (_, result) => { resolve(result) },
        (_, error) => { console.log("error dropping users table"); reject(error)
        }
      )
    })
  })
}

const getLists = async (query,setList) => {
  return new Promise((resolve,reject)=>{
    db.transaction(
      tx => {
        tx.executeSql(
          query,
          [],
          (_, { rows: { _array } }) => {
            console.log('Setting : '+JSON.stringify(_array.length))
            setList(_array)
          }
        );
      },
      (t, error)     => console.log("db error load users"),
      (_t, _success) => console.log("loaded users")  
    );
  })
}

const setProps = async (query) => {
  return new Promise((resolve,reject)=>{
    db.transaction(
      tx => {
        tx.executeSql(
          query,
          [],
          (_, { rows: { _array } }) => {
            if(_array.length<1){
              console.log('Default props not found setting default props');
              ExecuteInsert("insert into app_prop values ('#eaf3f1','normal')");
            }
          }
        );
      },
      (t, error)     => console.log("db error load users"),
      (_t, _success) => console.log("loaded users")  
    );
  })
}




const insertUser = (userName, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into users (name) values (?)', [userName] );
    },
    (t, error) => { console.log("db error insertUser"); console.log(error);},
    (t, success) => { successFunc() }
  )
}

const insertQry = (qry,func) => {
  db.transaction( tx => {
      tx.executeSql( qry );
    },
    (t, error) => { func()},
    (t, success) => { console.log(success) }
  )
}


const ExecuteInsert=(sql,params=[])=>new Promise((resolve,reject)=>{
  db.transaction((tx)=>{
    tx.executeSql(sql,params,(trans,results)=>{
      resolve(results);
    },
    (error)=>{
      reject(error);
    }),      
    (_, success) => { 
      resolve(success)
    };
  });
});

const CreateTable=(sql,params=[])=>new Promise((resolve,reject)=>{
  db.transaction((tx)=>{
    tx.executeSql(sql,params,(trans,results)=>{
      //console.log('table created results : '+JSON.stringify(results.rows._array));
      const res=JSON.stringify(results.rows._array[0]);
      console.log('Result is '+res);
      resolve(results);
    },
    (error)=>{
      console.log('ERROR : '+JSON.stringify(error));
      reject(error);
    }),      
    (_, success) => { 
      console.log('SUCC '+JSON.stringify(success));
      resolve(success)
    };
  });
});

const insertHdr=async(params)=>{
  let insert= await ExecuteInsert("INSERT INTO list_hdr(id,title) VALUES (?,?)",params);
  console.log('Insert result '+JSON.stringify(insert))
}


const insertDtl=async(params)=>{
  let insert= await ExecuteInsert("INSERT INTO list_dtl(pid,id,value,isSelected) VALUES (?,?,?,?)",params);
  console.log('Insert result '+JSON.stringify(insert))
}

const deleteHdr=async(params)=>{
  console.log("delete from list_hdr where id="+params);
  let insert= await ExecuteInsert("delete from list_hdr where id=?",params);
  console.log('Delete result '+JSON.stringify(insert))
}

const deleteDtl=async(params)=>{
  console.log("delete from list_dtl where pid="+params);
  let insert= await ExecuteInsert("delete from list_dtl where pid=?",params);
  console.log('Delete result '+JSON.stringify(insert))
}

const updateHdr=async(params)=>{
  console.log("update list_hdr set title = "+params[0]+", where id = "+params[1])
  let qry=await ExecuteInsert("update list_hdr set title = ? where id = ?",params)
}

const updateCheck=async(params)=>{
  console.log("update list_dtl set isSelected="+params[0]+" where pid = "+params[1]+" and id ="+params[2]);
  let qry = await ExecuteInsert("update list_dtl set isSelected = ? where pid = ? and id = ? ",params)
  console.log('update check result : '+JSON.stringify(qry));
}

const updateTheme=async(params)=>{
  console.log("update app_prop set bgColor = "+params[0]);
  let qry=await ExecuteInsert("update app_prop set bgColor = ?",params);
  console.log('update theme result : '+JSON.stringify(qry));

}

const updateFont=async(params)=>{
  console.log("update app_prop set font = "+params[0])
  let qry=await ExecuteInsert("update app_prop set font = ?",params)
  console.log('update font result : '+JSON.stringify(qry));

}


const setupDatabaseAsync = async (create) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(create);
      },
      (_, error) => { console.log("db error creating table "+create); console.log(error); reject(error) },
      (_, success) => { resolve(success)}
    )
  })
}

const setupUsersAsync = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( 'insert into users (id, name) values (?,?)', [1, "john"] );
      },
      (t, error) => { console.log("db error insertUser"); console.log(error); resolve() },
      (t, success) => { resolve(success)}
    )
  })
}

export const database = {
  getLists,
  getUsers,
  insertUser,
  setupDatabaseAsync,
  setupUsersAsync,
  dropDatabaseTablesAsync,
  loadDataAsync,insertQry,insertHdr,insertDtl,
  deleteHdr,deleteDtl,updateHdr,ExecuteInsert,
  updateCheck,updateTheme,updateFont,CreateTable,setProps
}
