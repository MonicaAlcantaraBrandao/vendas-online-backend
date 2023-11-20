import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { UserId } from '../decorators/user-id.decorator';
  import { CreateOrderDto } from './dtos/create-order.dto';
  import { OrderService } from './order.service';
  
  @Controller('order')
  export class OrderController {
    constructor(private readonly orderService: OrderService) {}
  
    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(
      @Body() createOrderDTO: CreateOrderDto,
      @UserId() userId: number,
    ) {
      return this.orderService.createOrder(createOrderDTO, userId);
    }
  }