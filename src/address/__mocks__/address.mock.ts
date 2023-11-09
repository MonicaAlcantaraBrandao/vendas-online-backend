import { cityMock } from "../../city/__mocks__/city.mock";
import { AddressEntity } from "../entities/address.entity";
import { userEntityMock } from "../../user/__mocks__/user.mock";

export const addressMock: AddressEntity = {
    cep: '121212',
    cityId: cityMock.id,
    complement: 'complement',
    createdAt: new Date(),
    id: 1212,
    numberAddress: 654,
    updatedAt: new Date(),
    userId: userEntityMock.id,
}