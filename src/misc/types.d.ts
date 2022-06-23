import { DBSchema } from "idb";

interface iShopping {
    id?:number;
    cost:string;
    bought:string;
    currency?:number;
}

interface iCurrency {
    id?:number;
    name: string;
    shortName: string;
    shopping: Array<number>;
}

//Schema
interface iCurrencyDB extends DBSchema{
    currencies: {
        value: iCurrency;
        key: number;
        indexes: { shortName: string };
    };
    shopping: {
        value: iShopping;
        key: number;
        indexes: { currency: number };
    };
}

//types
interface iScore {
    label:string,
    total:number
}

export {
    iCurrency,
    iCurrencyDB,
    iShopping,
    iScore
}