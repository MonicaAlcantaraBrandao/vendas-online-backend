import { Body, Controller, Post, Get} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interface/user.entity';

@Controller('user')
export class UserController {

  constructor(private readonly userService:UserService){}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto):Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers():Promise<UserEntity[]>{
    return this.userService.getAllUsers();
  }
}
