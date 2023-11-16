import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PaymentService } from 'src/payments/payments.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderEntity: Repository<OrderEntity>,
        private readonly paymentService: PaymentService
    ){}

    async CreateOrder(createOrderDto: CreateOrderDto, cartId: number): Promise<OrderEntity>{
        await this.paymentService.createPayment(createOrderDto);
        return null;
    }


}
