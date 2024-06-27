import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ProductCreateRequest, ProductDeleteRequest, ProductGetAllRequest, ProductGetOneRequest, ProductUpdateRequest } from '../interfaces'
import { IsBooleanString, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

export class ProductGetAllRequestDto implements ProductGetAllRequest {
	@ApiPropertyOptional({ example: 'name' })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	categoryId?: string

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
	sort?: 'name' | 'createdAt'

	@ApiPropertyOptional({ example: 'desc' })
	@IsString()
	@IsOptional()
	sortType?: 'asc' | 'desc'
}

export class ProductGetOneRequestDto implements ProductGetOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class ProductCreateRequestDto implements ProductCreateRequest {
	@ApiProperty({ example: 'name' })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({ example: 10 })
	@IsNumber()
	@IsNotEmpty()
	price: number

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	categoryId: string
}

export class ProductChangeRequestDto implements ProductUpdateRequest {
	@ApiProperty({ example: 'name' })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({ example: 10 })
	@IsNumber()
	@IsNotEmpty()
	price: number

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	categoryId: string
}

export class ProductUpdateRequestDto implements ProductUpdateRequest {
	@ApiPropertyOptional({ example: 'name' })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ example: 10 })
	@IsNumber()
	@IsOptional()
	price?: number

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	categoryId?: string
}

export class ProductDeleteRequestDto implements ProductDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
