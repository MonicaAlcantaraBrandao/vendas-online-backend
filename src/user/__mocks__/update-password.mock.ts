import { UpdatePasswordDto } from "../dtos/update-password.dto";

export const updatePasswordMock: UpdatePasswordDto = {
    lastPassword: 'abcde',
    newPassword: 'novasenha'
}

export const updatePasswordInvalidMock: UpdatePasswordDto = {
    lastPassword: 'errada',
    newPassword: 'novasenha'
}