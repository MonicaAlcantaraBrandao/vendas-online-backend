import { Body, Controller, Post, Get} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserInterface } from './interface/user.interface';

@Controller('user')
export class UserController {

  constructor(private readonly userService:UserService){}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto):Promise<UserInterface> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers():Promise<UserInterface[]>{
    return this.userService.getAllUsers();
  }
}
