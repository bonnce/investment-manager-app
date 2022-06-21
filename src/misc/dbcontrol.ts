import { DBSchema, IDBPDatabase, openDB } from "idb"

//Schema
interface Currency extends DBSchema{
    currency: {
        value: {
          name: string;
          shortName: string;
          shopping: {
            cost:string;
            bought:string;
          };
        };
        key: number;
        indexes: { shortName: string };
    };
}

// create data base
const createDB = async (nameDB:string,nameColl:string,...indexes:Array<string>)=>{
    try{
        return await openDB(nameDB,1,{
        upgrade(db, oldVersion, newVersion, transaction) {
            switch(oldVersion){
                case 0:
                case 1:
                    const store = db.createObjectStore(nameColl,{
                        autoIncrement: true,
                        keyPath: 'id'
                    })
                    indexes.map((i)=> store.createIndex(i,i))
            }
        }
    })
    } catch (e){
        console.error('when executed the create database catch: ',e)
        return null
    }
}

// get data from db
const getAll = async (db:IDBPDatabase,nameColl:string)=>{
    try{
        const tx = db.transaction(nameColl,'readonly')
        const store = tx.objectStore(nameColl)
        return await store.getAll()
    }catch(e){
        console.error('there is an error with getall method: ',e)
        return null
    }
}

const get = async (db:IDBPDatabase,nameColl:string,index:string)=>{
    try{
        const tx = db.transaction(nameColl,'readonly')
        const store = tx.objectStore(nameColl)
        return await store.get([index])
    }catch(e){
        console.error('there is an error with getall method: ',e)
        return null
    }
}

// add data to db
const save = async (db:IDBPDatabase,nameColl:string,item:object)=>{
    try{
        const tx = db.transaction(nameColl,'readwrite')
        const store = tx.objectStore(nameColl)
        await store.add(item)
        return await tx.done
    }catch(e){
        console.error('there is an error with save method: ',e)
        return null
    }
}

// remove data from db
const remove = async (db:IDBPDatabase,nameColl:string,nameItem:string)=>{
    try{
        const tx = db.transaction(nameColl,'readwrite')
        const store = tx.objectStore(nameColl)
        await store.delete(nameItem)
        return await tx.done
    }catch(e){
        console.error('there is an error with remove method: ',e)
        return null
    }
}

// update data from db
const update = async (db:IDBPDatabase,nameColl:string,nameItem:string)=>{
    try{
        const tx = db.transaction(nameColl,'readwrite')
        const store = tx.objectStore(nameColl)
        await store.put(nameItem)
        return await tx.done
    }catch(e){
        console.error('there is an error with update method: ',e)
        return null
    }
}

export {
    createDB,
    get,
    getAll,
    save,
    remove,
    update,
}