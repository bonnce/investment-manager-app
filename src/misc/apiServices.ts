import axios from 'axios'
import { iCurrency, iShopping } from './types'

const api = axios.create({
    baseURL: `${process.env.DOMAIN}/api`
})

// currencies calls -------------

export const getAllCurrencies = async (): Promise<iCurrency[]> => {
    const result = await api.get("/currencies").catch(e => { console.log(e)})
    return result as unknown as iCurrency[]
}

export const saveCurrency = async (currency: iCurrency): Promise<iCurrency> => {
    const result = await api.post("/currencies", currency).catch(e => { console.log(e)})
    return result as unknown as iCurrency
}

export const updateCurrency = async (id: number,currency: iCurrency): Promise<iCurrency> => {
    const result = await api.put(`/currencies/${id}`, currency).catch(e => { console.log(e)})
    return result as unknown as iCurrency
}

// shopping calls -------------

export const getAllShoppings = async (): Promise<iShopping[]> => {
    const result = await api.get("/investments").catch(e => { console.log(e)})
    return result as unknown as iShopping[]
}

export const saveShopping = async (shopping: iShopping): Promise<iShopping> => {
    const result = await api.post("/investments", shopping).catch(e => { console.log(e)})
    return result as unknown as iShopping
}

export const deleteShopping = async (id: number): Promise<iShopping> => {
    const result = await api.delete(`/investments/${id}`).catch(e => { console.log(e)})
    return result as unknown as iShopping
}