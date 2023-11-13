import { Body, Controller, Post, Get, ValidationPipe, UsePipes, Param, Patch} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('user')
export class UserController {

  constructor(private readonly userService:UserService){}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto):Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers():Promise<ReturnUserDto[]>{
    return (await this.userService.getAllUsers()).map((userEntity) => new ReturnUserDto(userEntity));
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto>{
    return new ReturnUserDto(await this.userService.getUserbyIdUsingRelations(userId))
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordDto: UpdatePasswordDto, 
    @UserId() userId: number): Promise<UserEntity>{
    return this.userService.updatePasswordUser(updatePasswordDto, userId)
  }
}
