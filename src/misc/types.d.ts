import { DBSchema } from "idb";


interface iCurrency {
    name: string;
    shortName: string;
    shopping?: {
        cost:string;
        bought:string;
    };
}

//Schema
interface iCurrencyDB extends DBSchema{
    currencies: {
        value: Currency;
        key: number;
        indexes: { shortName: string };
    };
}

export {
    iCurrency,
    iCurrencyDB
}