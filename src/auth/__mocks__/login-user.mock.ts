
import { LoginDto } from "../dtos/login.dto";
import { userEntityMock } from "../../user/__mocks__/user.mock";

export const loginUserMock: LoginDto = {
    email: userEntityMock.email,
    password: 'abc',
}