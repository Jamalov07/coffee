import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CategoryCreateRequest, CategoryDeleteRequest, CategoryGetAllRequest, CategoryGetOneRequest, CategoryUpdateRequest } from '../interfaces'
import { IsBooleanString, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

export class CategoryGetAllRequestDto implements CategoryGetAllRequest {
	@ApiPropertyOptional({ example: 'name' })
	@IsString()
	@IsOptional()
	name?: string

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

export class CategoryGetOneRequestDto implements CategoryGetOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class CategoryCreateRequestDto implements CategoryCreateRequest {
	@ApiProperty({ example: 'name' })
	@IsString()
	@IsNotEmpty()
	name: string
}

export class CategoryChangeRequestDto implements CategoryUpdateRequest {
	@ApiProperty({ example: 'name' })
	@IsString()
	@IsNotEmpty()
	name: string
}

export class CategoryUpdateRequestDto implements CategoryUpdateRequest {
	@ApiPropertyOptional({ example: 'name' })
	@IsString()
	@IsOptional()
	name?: string
}

export class CategoryDeleteRequestDto implements CategoryDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
