import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
    cpf: '123123',
    createdAt: new Date(),
    email: 'monicaaa',
    id: 12,
    name: 'monica',
    password: '$2b$10$ktWNcYohYcLrqb5ZST0ECOJiYSDMN9umCR3o1fLBxyGu6KAPF9Gru',
    phone: '313333333',
    typeUser: UserType.User,
    updatedAt: new Date(),
}