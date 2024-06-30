export class Malzeme {
    malzemeId?: number;
    totalPriceExcludDiscount?: number;
    price: number;
    thickness: number;
    updateDate?: Date;
    ebat:string
    listeTuru:number
}

export class Ebat {
    malzemeId: number;   
    thickness: Kalinliklar[];
    updateDate: Date;
    ebat:string
}
export class Kalinliklar {
    thicknes: number;
    totalPriceExcludDiscount: number;
    price: number;
}
