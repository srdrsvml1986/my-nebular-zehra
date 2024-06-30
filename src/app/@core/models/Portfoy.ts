import { Pay } from "./pay";

export class Portfoy {
    portfoyId: number;
    portfoyName: string;
    description?: string;
    addedMoney: number;
    availablePrice: number;
    targetPrice: number;
    isSale: boolean;
    commissionRate: number;
    createDate: Date;
    Pays: Pay[];
}

