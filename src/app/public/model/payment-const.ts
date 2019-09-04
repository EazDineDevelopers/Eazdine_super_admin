export class PaymentType {

    public static PAY_FOR_ALL = 'PAY_FOR_ALL';
    public static EQUALLY_DIVIDED = 'EQUALLY_DIVIDED';
    public static SELF_PAY = 'SELF_PAY';
    /*  public static ORDER_WISE_PAY = 'ORDER_WISE_PAY'; */
    public static PAY_FOR_FRIENDS = 'PAY_FOR_FRIENDS';
    public static PAY_ONLY_DRINKS = 'PAY_ONLY_DRINKS';
    /*    public static PAY_ONLY_DRINKS_WITH_FRIENDS = 'PAY_ONLY_DRINKS_WITH_FRIENDS'; */
    public static PAY_WITHOUT_DRINKS = 'PAY_WITHOUT_DRINKS';
    public static CASH_ON_DELIVERY = 'CASH_ON_DELIVERY';
    public static CARD_PAYMENT = 'CARD_PAYMENT';

    public static PAYMENT_OPTION: any[] = [{ id: 1, type: 'PAY FOR ALL', value: PaymentType.PAY_FOR_ALL }, { id: 2, type: 'EQUALLY DIVIDED', value: PaymentType.EQUALLY_DIVIDED },
    { id: 3, type: 'SELF PAY', value: PaymentType.SELF_PAY },
    { id: 4, type: 'PAY FOR FRIENDS', value: PaymentType.PAY_FOR_FRIENDS }, { id: 5, type: 'PAY ONLY DRINKS', value: PaymentType.PAY_ONLY_DRINKS },
    { id: 6, type: 'PAY WITHOUT DRINKS', value: PaymentType.PAY_WITHOUT_DRINKS }];

}