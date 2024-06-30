import { User } from 'src/app/@core/models/user';
export class PersonelBudget
{
    personelBudgetId:number
    amount:number;
    balance:number;
    description:string;
    isIncome:boolean;
    date:Date;
    userId:number;
    user:User
    personelBudgetCategoryId:number;
    PersonelBudgetCategory:PersonelBudgetCategory
}

export class PersonelBudgetCategory
{
    description:string;
    categoryName:string;
    personelBudgetCategoryId:number;
}

export class PersonelBudgetDto
{
    personelBudgetId:number
    amount:number;
    balance:number;
    description:string;
    isIncome:boolean;
    date:Date;
    userId:number;
    personelBudgetCategoryId:number;
    categoryName:string;
    categoryDescription:string;
}
// "personelBudgetCategoryId": "1",
//         "categoryName": "Diriliş Aprt",
//         "description": ""

// "personelBudgetId": "4",
// "amount": "500000",
// "description": "bakiye girişi",
// "isIncome": true,
// "balance": "500000",
// "date": "2023-05-06T22:48:51.6646967",
// "userId": "1",
// "personelBudgetCategoryId": "9"