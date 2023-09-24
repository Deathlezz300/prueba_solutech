export interface IAgreementPeticion {
    ok:         boolean;
    agreements: IAgreement[];
}

export interface IAgreement {
    id:         number;
    terms:      string;
    status:     string;
    createdAt:  Date;
    updatedAt:  Date;
    SupplierId: number;
    BuyerId:    number;
}
