import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService
    ){}

    @Post('/cart/:cartId')
    @UsePipes(ValidationPipe)
    async createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @Param('cartId') cartId: number
    ): Promise<OrderEntity>{
        return this.orderService.CreateOrder(createOrderDto, cartId)
    }
}
