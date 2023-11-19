import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from '../cart/cart.module';
import { OrderProductModule } from '../order-product/order-product.module';
import { OrderEntity } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PaymentModule } from '../payments/payment.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    PaymentModule,
    CartModule,
    OrderProductModule,
    ProductModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}