import { Body, Controller, Post, Get, ValidationPipe, UsePipes, Param, Patch} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserId } from '../decorators/user-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';

@Controller('user')
export class UserController {

  constructor(private readonly userService:UserService){}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto):Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Roles(UserType.Admin)
  @Get('/all')
  async getAllUser():Promise<ReturnUserDto[]>{
    return (await this.userService.getAllUser()).map((userEntity) => new ReturnUserDto(userEntity));
  }

  @Roles(UserType.Admin)
  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto>{
    return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(userId));
  }

  @Roles(UserType.Admin, UserType.User)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordDto: UpdatePasswordDto, 
    @UserId() userId: number): Promise<UserEntity>{
    return this.userService.updatePasswordUser(updatePasswordDto, userId)
  }

  @Roles(UserType.Admin, UserType.User)
  @Get()
  async getInfoUser(@UserId() userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByIdUsingRelations(userId)
    );
  }
}
