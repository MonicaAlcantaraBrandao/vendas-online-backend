import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
    cpf: '123123',
    createdAt: new Date(),
    email: 'monica@email.com',
    id: 12,
    name: 'monica',
    password: 'senhatop',
    phone: '313333333',
    typeUser: UserType.User,
    updatedAt: new Date(),
}