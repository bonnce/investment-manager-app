import axios from 'axios'
import { CurrencyReal, iCurrency, iShopping, ShoppingReal } from './types'

const domain = process.env.NODE_ENV === 'production'? 'http://invm-api:8080' : 'http://localhost:8080'

console.log(domain)

const api = axios.create({
    baseURL: `${domain}/api`
})

// currencies calls -------------

export const getAllCurrencies = async (): Promise<CurrencyReal[]> => {
    try{
        const result = await api.get<CurrencyReal[]>("/currencies")
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}

export const saveCurrency = async (currency: iCurrency): Promise<CurrencyReal> => {
    try{
        const result = await api.post<CurrencyReal>("/currencies", currency)
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}

export const updateCurrency = async (id: number,currency: Partial<iCurrency>): Promise<CurrencyReal> => {
    try{
        const result = await api.put<CurrencyReal>(`/currencies/${id}`, currency)
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}

// shopping calls -------------

export const getAllShoppings = async (): Promise<ShoppingReal[]> => {
    try{
        const result = await api.get<ShoppingReal[]>("/investments")
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}

export const saveShopping = async (shopping: iShopping): Promise<ShoppingReal> => {
    try{
        const result = await api.post<ShoppingReal>("/investments", shopping)
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}

export const deleteShopping = async (id: number): Promise<ShoppingReal> => {
    try{
        const result = await api.delete<ShoppingReal>(`/investments/${id}`)
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}

export const updateShopping = async (id: number,shopping: Partial<iShopping>): Promise<ShoppingReal> => {
    try{
        const result = await api.put<ShoppingReal>(`/investments/${id}`, shopping)
        return result.data
        
    }catch(e){
        const {message} = e as Error
        throw new Error(`Ups! the next error appeared: ${message}`)
    }
}