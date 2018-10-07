export interface ITool {
    id?:number;
    name:string;
    barcode:number;
    total?:number;
    state:string;
    type:string;
    category:number|string;
}
