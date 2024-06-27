import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'

@Module({
	imports: [PrismaModule],
	controllers: [CartController],
	providers: [CartService],
	exports: [CartService],
})
export class CartModule {}
