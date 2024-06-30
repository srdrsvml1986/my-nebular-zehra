import { NbAuthJWTToken } from "@nebular/auth";

export class AuthJWTToken extends NbAuthJWTToken {

    constructor(token: any, ownerStrategyName: string, createdAt?: Date){
        super(token,ownerStrategyName,createdAt);
        console.log("token:");
        
        console.log(token);
        
    }


}
