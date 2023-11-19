import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from 'src/cart/cart.module';
import { OrderProductModule } from 'src/order-product/order-product.module';
import { OrderEntity } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PaymentModule } from 'src/payments/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    PaymentModule,
    CartModule,
    OrderProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}