export interface ISubmissionPeticion {
    ok:          boolean;
    submissions: ISubmission[];
}

export interface ISubmission {
    id:          number;
    description: string;
    price:       number;
    paid:        boolean;
    paymentDate: null;
    createdAt:   Date;
    updatedAt:   Date;
    AgreementId: number;
    Agreement:   Agreement;
}

export interface Agreement {
    id:         number;
    terms:      string;
    status:     string;
    createdAt:  Date;
    updatedAt:  Date;
    SupplierId: number;
    BuyerId:    number;
}