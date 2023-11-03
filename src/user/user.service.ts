import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserInterface } from './interface/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    private users:UserInterface[] = [];

    async createUser(createUserDto:CreateUserDto):Promise<UserInterface>{
        const saltOrRounds = 10;

        const passwordHashed = await hash(createUserDto.password, saltOrRounds);

        const user:UserInterface = {
            ...createUserDto,
            id: this.users.length + 1,
            password: passwordHashed
        }
        
        this.users.push(user);

        return user;
    }

    async getAllUsers():Promise<UserInterface[]>{
        return this.users
    }
}
