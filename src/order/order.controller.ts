import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { UserId } from '../decorators/user-id.decorator';
  import { CreateOrderDto } from './dtos/create-order.dto';
  import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
  
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

    @Get()
    async findOrdersByUserId(@UserId() userId: number): Promise<OrderEntity[]> {
      return this.orderService.findOrdersByUserId(userId);
    }
  }