import { UserEntity } from "../../user/entities/user.entity"

export class LoginPayload {
    id: number;
    typeUser: number;
    static typeUser: import("c:/Users/Desenv/projetos/Back-end/vendas-online-backend/src/user/enum/user-type.enum").UserType;

    constructor(user:UserEntity){
        this.id = user.id;
        this.typeUser = user.typeUser;
    }
}