import { $Enums } from '@prisma/client'
import { OrderCreateRequest, OrderDeleteRequest, OrderGetAllRequest, OrderGetOneRequest, OrderUpdateRequest } from '../interfaces'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBooleanString, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

export class OrderGetAllRequestDto implements OrderGetAllRequest {
	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	productId?: string

	@ApiPropertyOptional({ example: 'new' })
	@IsEnum($Enums.OrderStatusEnum)
	@IsOptional()
	status?: $Enums.OrderStatusEnum

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	userId?: string

	@ApiPropertyOptional({ example: true })
	@IsBooleanString()
	@IsOptional()
	pagination?: boolean

	@ApiPropertyOptional({ example: 1 })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	pageNumber?: number

	@ApiPropertyOptional({ example: 10 })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	pageSize?: number

	@ApiPropertyOptional({ example: new Date(0) })
	@IsDateString()
	@IsOptional()
	startDate?: Date

	@ApiPropertyOptional({ example: new Date() })
	@IsDateString()
	@IsOptional()
	endDate?: Date

	@ApiPropertyOptional({ example: 'createdAt' })
	@IsString()
	@IsOptional()
	sort?: 'status' | 'createdAt'

	@ApiPropertyOptional({ example: 'desc' })
	@IsString()
	@IsOptional()
	sortType?: 'asc' | 'desc'
}

export class OrderGetOneRequestDto implements OrderGetOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class OrderCreateRequestDto implements OrderCreateRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	cartId: string
}

export class OrderChangeRequestDto implements OrderUpdateRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	productId: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	userId: string

	@ApiProperty({ example: 4 })
	@IsNumber()
	@IsNotEmpty()
	count: number
}

export class OrderUpdateRequestDto implements OrderUpdateRequest {
	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	productId?: string

	@ApiPropertyOptional({ example: 'new' })
	@IsEnum($Enums.OrderStatusEnum)
	@IsOptional()
	status?: $Enums.OrderStatusEnum

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	userId?: string

	@ApiPropertyOptional({ example: 4 })
	@IsNumber()
	@IsOptional()
	count?: number
}

export class OrderDeleteRequestDto implements OrderDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
