import { Pay } from 'src/app/@core/models/pay';
import { MynetHisseDetay } from './MynetHisseDetay';
export class MynetHisse {
    id?: number;
    ad?: string|undefined;
    kod?: string;
    href?: string|undefined; 
    hisseDetay?: MynetHisseDetay|undefined; 
    pay?:Pay
}


