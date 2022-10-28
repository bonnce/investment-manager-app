import axios from 'axios'
import { iCurrency, iShopping, shoppingResponse, currencyResponse } from './types'

const domain = process.env.DOMAIN ?? 'http://localhost:8080'

const api = axios.create({
    baseURL: `${domain}/api`
})

// currencies calls -------------

export const getAllCurrencies = async (): Promise<iCurrency[]> => {
    try{
        const result = await api.get<iCurrency[]>("/currencies")
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}

export const saveCurrency = async (currency: iCurrency): Promise<iCurrency> => {
    try{
        const result = await api.post<iCurrency>("/currencies", currency)
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}

export const updateCurrency = async (id: number,currency: iCurrency): Promise<iCurrency> => {
    try{
        const result = await api.put<iCurrency>(`/currencies/${id}`, currency)
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}

// shopping calls -------------

export const getAllShoppings = async (): Promise<iShopping[]> => {
    try{
        const result = await api.get<iShopping[]>("/investments")
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}

export const saveShopping = async (shopping: iShopping): Promise<iShopping> => {
    try{
        const result = await api.post<iShopping>("/investments", shopping)
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}

export const deleteShopping = async (id: number): Promise<iShopping> => {
    try{
        const result = await api.delete<iShopping>(`/investments/${id}`)
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}