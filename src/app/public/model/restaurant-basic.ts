export class RestaurantBasic{
	public id: string;
	public imageURL: string;
	public name: string;
	public isOpen: boolean;
	public rating: number;
	public offerText:string;
	public phone: string;
	public status: string;
	public offers:any [] = [];
	public addressText: string;
	public zip: string;
}