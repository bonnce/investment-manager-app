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

// install prompt
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;
    prompt(): Promise<void>;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

type currencyResponse = {
    data:iCurrency[]
}

type shoppingResponse = {
    data:iShopping[]
}

export {
    iCurrency,
    iCurrencyDB,
    iShopping,
    iScore,
    currencyResponse,
    shoppingResponse,
    BeforeInstallPromptEvent
}