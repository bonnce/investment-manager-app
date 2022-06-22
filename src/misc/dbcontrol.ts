import { IDBPDatabase, openDB } from "idb"
import { iCurrency, iCurrencyDB } from "./types"
import { INDEXDB, NAMECOLL } from "./const"

// create data base
const createDB = async (nameDB:string)=>{
    try{
        return openDB<iCurrencyDB>(nameDB,1,{
        upgrade(db, oldVersion, newVersion, transaction) {
            switch(oldVersion){
                case 0:
                case 1:
                    const store = db.createObjectStore(NAMECOLL,{
                        autoIncrement: true,
                        keyPath: 'id'
                    })
                    store.createIndex(INDEXDB,INDEXDB)
            }
        }
    })
    } catch (e){
        console.error('when executed the create database catch: ',e)
        return null
    }
}

// get data from db
const getAll = async (db:IDBPDatabase<iCurrencyDB>)=>{
    try{
        const tx = db.transaction(NAMECOLL,'readonly')
        const store = tx.objectStore(NAMECOLL)
        return store.getAll()
    }catch(e){
        console.error('there is an error with getall method: ',e)
        return null
    }
}

const get = async (db:IDBPDatabase<iCurrencyDB>,index:typeof INDEXDB,nameItem:string)=>{
    try{
        return db.getFromIndex(NAMECOLL,index,nameItem)
    }catch(e){
        console.error('there is an error with getall method: ',e)
        return null
    }
}

// add data to db
const save = async (db:IDBPDatabase<iCurrencyDB>,item:iCurrency)=>{
        const isInStore = await db.getFromIndex(NAMECOLL,INDEXDB,item.shortName)
        if(isInStore) return {error:"alredy in the store"}

        const tx = db.transaction(NAMECOLL,'readwrite')
        const store = tx.objectStore(NAMECOLL)

        await store.add(item)
        return 'done'

}

// remove data from db
const remove = async (db:IDBPDatabase<iCurrencyDB>,key:number)=>{
    try{
        const tx = db.transaction(NAMECOLL,'readwrite')
        const store = tx.objectStore(NAMECOLL)

        const isInStore = await store.get(key)
        if(!isInStore) return {error:"not found item, cannot remove"}

        await store.delete(key)
        return tx.done
    }catch(e){
        console.error('there is an error with remove method: ',e)
        return null
    }
}

// update data from db
const update = async (db:IDBPDatabase<iCurrencyDB>,item:iCurrency)=>{
    try{
        const tx = db.transaction(NAMECOLL,'readwrite')
        const store = tx.objectStore(NAMECOLL)

        const isInStore = await db.getFromIndex(NAMECOLL,INDEXDB,item.shortName)
        if(!isInStore) return {error:"not found item, cannot update"}

        await store.put(item)
        return tx.done
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