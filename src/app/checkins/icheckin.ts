export interface ICheckin {
    id?:number;
    date:string;
    url_image?:string;
    total?:number;
    tools:[{tool_id:number, tool_quantity:number}];
    pivot?:[{tool_id:number, tool_quantity:number}];
}
