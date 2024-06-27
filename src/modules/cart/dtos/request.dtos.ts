import { $Enums } from '@prisma/client'
import { CartCreateRequest, CartDeleteRequest, CartGetAllRequest, CartGetOneRequest, CartUpdateRequest } from '../interfaces'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBooleanString, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

export class CartGetAllRequestDto implements CartGetAllRequest {
	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	productId?: string

	@ApiPropertyOptional({ example: 'new' })
	@IsEnum($Enums.CartStatusEnum)
	@IsOptional()
	status?: $Enums.CartStatusEnum

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

export class CartGetOneRequestDto implements CartGetOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class CartCreateRequestDto implements CartCreateRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	productId: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	userId: string

	@ApiProperty({ example: 1 })
	@IsNumber()
	@IsNotEmpty()
	count: number
}

export class CartChangeRequestDto implements CartUpdateRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	productId: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	userId: string

	@ApiProperty({ example: 1 })
	@IsNumber()
	@IsNotEmpty()
	count: number
}

export class CartUpdateRequestDto implements CartUpdateRequest {
	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	productId?: string

	@ApiPropertyOptional({ example: 'new' })
	@IsEnum($Enums.CartStatusEnum)
	@IsOptional()
	status?: $Enums.CartStatusEnum

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	userId?: string

	@ApiPropertyOptional({ example: 4 })
	@IsNumber()
	@IsOptional()
	count?: number
}

export class CartDeleteRequestDto implements CartDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
