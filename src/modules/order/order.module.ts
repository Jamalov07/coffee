import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
	imports: [PrismaModule],
	controllers: [OrderController],
	providers: [OrderService],
	exports: [OrderService],
})
export class OrderModule {}
