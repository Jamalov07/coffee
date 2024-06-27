import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { JWTModule } from '../jwt'

@Module({
	imports: [PrismaModule, JWTModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
