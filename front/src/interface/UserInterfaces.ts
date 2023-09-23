export type IStatus='not-authenticated' | 'loading' | 'authenticated';


export interface IUserPeticion {
    ok:      boolean;
    usuario: IUser;
    token:   string;
}

export interface IUser {
    id:         number;
    firstName:  string;
    lastName:   string;
    profession: string;
    balance:    number;
    type:       string;
    createdAt:  Date;
    updatedAt:  Date;
}