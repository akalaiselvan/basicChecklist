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
            setList(_array)
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
  loadDataAsync,insertQry
}
