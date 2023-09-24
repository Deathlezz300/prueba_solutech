export interface IAdminFechas {
    ok:       boolean;
    fechaMin: Date;
    fechaMax: Date;
}

export interface IAdminSuppliers {
    ok:                  boolean;
    professionWithSales: IProfessionWithSales;
}

export interface IProfessionWithSales {
    profession: string;
    totalSales: number;
}

export interface IAdminBuyers {
    ok:            boolean;
    usersWithBuys: IUsersWithBuy[];
}

export interface IUsersWithBuy {
    id:         number;
    firstName:  string;
    lastName:   string;
    profession: string;
    type:       string;
    totalBuys:  number;
}
