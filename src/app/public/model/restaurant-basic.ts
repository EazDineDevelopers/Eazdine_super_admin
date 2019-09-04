export class RestaurantBasic{
	public id: string;
	public name: string;
	public password?: string;
	public email?: string;
	public fax?: string;
	public imageURL: string;
	public location: any;
	public eta: number;
	public isOpen: boolean;
	public rating: number;
	public likeCount: number;
	public offerText:string;
	public addressText:string;
	public phone: string;
	public status?: boolean;
	public registrationNo?: string;
	public ownerMobileVerification?: boolean;
	public ownerEmailVerification?: boolean;
	public restaurantEmailVerification?: boolean;
}