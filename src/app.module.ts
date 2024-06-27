import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CartModule, CategoryModule, JWTModule, OrderModule, PrismaModule, ProductModule, UserModule } from './modules'
import { databaseConfig } from './configs'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'images'),
		}),
		ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
		PrismaModule,
		JWTModule,
		CategoryModule,
		ProductModule,
		UserModule,
		OrderModule,
		CartModule,
	],
})
export class AppModule {}
