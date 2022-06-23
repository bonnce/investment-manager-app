import { IDBPDatabase, openDB } from "idb"
import { iCurrency, iCurrencyDB, iShopping } from "./types"
import { INDEXCURRENCYDB,INDEXSHOPPINGDB, NAMECOLLCURRENCY,NAMECOLLSHOPPING } from "./const"

// create data base
const createDB = async (nameDB:string)=>{
    try{
        return openDB<iCurrencyDB>(nameDB,3,{
        upgrade(db, oldVersion, newVersion, transaction) {
            switch(oldVersion){
                case 0:
                case 1:
                case 2:
                case 3:
                    const storeCurrency = db.createObjectStore(NAMECOLLCURRENCY,{
                        autoIncrement: true,
                        keyPath: 'id'
                    })
                    storeCurrency.createIndex(INDEXCURRENCYDB,INDEXCURRENCYDB)
                    const storeShopping = db.createObjectStore(NAMECOLLSHOPPING,{
                        autoIncrement: true,
                        keyPath: 'id'
                    })
                    storeShopping.createIndex(INDEXSHOPPINGDB,INDEXSHOPPINGDB)
            }
        }
    })
    } catch (e){
        console.error('when executed the create database catch: ',e)
        return null
    }
}

// get data from db
const getAll = async (db:IDBPDatabase<iCurrencyDB>,nameColl:typeof NAMECOLLCURRENCY | typeof NAMECOLLSHOPPING)=>{
    try{
        const tx = db.transaction(nameColl,'readonly')
        const store = tx.objectStore(nameColl)
        return await store.getAll() as unknown[]
    }catch(e){
        console.error('there is an error with getall method: ',e)
        return null
    }
}

const get = async (db:IDBPDatabase<iCurrencyDB>,nameColl:typeof NAMECOLLCURRENCY | typeof NAMECOLLSHOPPING,req:number)=>{
    try{
        const tx = db.transaction(nameColl,'readonly')
        const store = tx.objectStore(nameColl)
        return await store.get(req)
    }catch(e){
        console.error('there is an error with getall method: ',e)
        return null
    }
}



// add data to db
const save = async (db:IDBPDatabase<iCurrencyDB>,nameColl:typeof NAMECOLLCURRENCY | typeof NAMECOLLSHOPPING,item:iCurrency|iShopping)=>{
    try{
        const isInStore = item?.id && await get(db,nameColl,item.id)
        if(isInStore) return "Already in database"


        const tx = db.transaction(nameColl,'readwrite')
        const store = tx.objectStore(nameColl)

        const key = await store.add(item)
        await tx.done
        return key
    }catch(e){
        console.error('there is an error with remove method: ',e)
        return null
    }
}

// remove data from db
const remove = async (db:IDBPDatabase<iCurrencyDB>,nameColl:typeof NAMECOLLCURRENCY | typeof NAMECOLLSHOPPING,key:number)=>{
    try{
        const tx = db.transaction(nameColl,'readwrite')
        const store = tx.objectStore(nameColl)

        const isInStore = await store.get(key)
        if(!isInStore) return "not found item, cannot remove"

        await store.delete(key)
        await tx.done
        return 'done'
    }catch(e){
        console.error('there is an error with remove method: ',e)
        return null
    }
}

// update data from db
const update = async (db:IDBPDatabase<iCurrencyDB>,nameColl:typeof NAMECOLLCURRENCY | typeof NAMECOLLSHOPPING, item:iCurrency|iShopping)=>{
    try{

        const isInStore = item?.id && await get(db,nameColl,item.id)
        if(!isInStore) return "not found item, cannot update"


        const tx = db.transaction(nameColl,'readwrite')
        const store = tx.objectStore(nameColl)

        await store.put(item)
        await tx.done
        return 'done'
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