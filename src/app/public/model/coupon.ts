export class RESTAURANT_COUPON {
    public static COUPON_APPLIED='COUPON_APPLIED';
    public static COUPON_EXPIRED='Coupon Expired';
    public static COUPON_INVALID=' Invalid Coupon';
   
    public static COUPON_CODE: any[] = [
    { code: 200, message: RESTAURANT_COUPON.COUPON_APPLIED }, 
    { code: 101, message: RESTAURANT_COUPON.COUPON_EXPIRED },
    { code: 102, message: RESTAURANT_COUPON.COUPON_INVALID },
    ];

 }