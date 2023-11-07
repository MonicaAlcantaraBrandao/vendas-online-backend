import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto:CreateUserDto):Promise<UserEntity>{
        const saltOrRounds = 10;

        const passwordHashed = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            typeUser:1,
            password: passwordHashed
        })
    }

    async getUserbyIdUsingRelations(userId:number):Promise<UserEntity>{
        return this.userRepository.findOne({
            where:{
                id: userId
            },
            relations:['addresses'],
        })
    }

    async getAllUsers():Promise<UserEntity[]>{
        return this.userRepository.find()
    }

    async findUserById(userId: number):Promise<UserEntity>{
        const user = await this.userRepository.findOne({
            where:{
                id: userId
            }
        });

        if(!user){
            throw new NotFoundException(`User Id: ${userId} Not Found`)
        }
        return user;
    }
}
