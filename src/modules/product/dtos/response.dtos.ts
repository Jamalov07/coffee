import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponse } from '../../../interfaces'
import { ProductCategory, ProductGetOneResponse } from '../interfaces'

export class ProductCategoryDto implements ProductCategory {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string
}

export class ProductGetOneResponseDto implements ProductGetOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ example: 'link' })
	image: string

	@ApiProperty({ example: 10 })
	price: number

	@ApiProperty({ type: ProductCategoryDto })
	category: ProductCategory

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class ProductGetAllResponseDto implements PaginationResponse<ProductGetOneResponse> {
	@ApiProperty({ example: 3 })
	pageCount: number

	@ApiProperty({ example: 3 })
	pageSize: number

	@ApiProperty({ example: 3 })
	totalCount: number

	@ApiProperty({ type: ProductGetOneResponseDto, isArray: true })
	data: ProductGetOneResponse[]
}
