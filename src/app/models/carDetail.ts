export interface CarDetail {
    id:number;
    brandId:number;
    brandName:string;
    colorId:number;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    description:string,
    createdAt:Date;
    images:string[];
}
