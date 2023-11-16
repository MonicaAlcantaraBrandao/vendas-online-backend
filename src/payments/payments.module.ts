import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PaymentEntity])],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentsModule {}
