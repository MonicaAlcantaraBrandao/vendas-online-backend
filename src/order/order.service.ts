import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { PaymentEntity } from '../payments/entities/payment.entity';
import { PaymentService } from '../payments/payment.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
  ) {}

  async createOrder(
    CreateOrderDto: CreateOrderDto,
    cartId: number,
    userId: number,
  ) {
    const payment: PaymentEntity = await this.paymentService.createPayment(
      CreateOrderDto,
    );

    const order = await this.orderRepository.save({
      addressId: CreateOrderDto.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });

    const cart = await this.cartService.findCartByUserId(userId, true);

    cart.cartProduct?.forEach((cartProduct) => {
      this.orderProductService.createOrderProduct(
        cartProduct.productId,
        order.id,
        0,
        cartProduct.amount,
      );
    });

    return null;
  }
}