import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), PaymentsModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
