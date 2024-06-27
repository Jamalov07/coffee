import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponse } from '../../../interfaces'
import { CartGetOneResponse, CartProduct, CartProductCategory, CartUser } from '../interfaces'

export class CartProductCategoryDto implements CartProductCategory {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string
}

export class CartUserDto implements CartUser {
	@ApiProperty({ example: 'uuid@gmail.com' })
	email: string

	@ApiProperty({ example: 'john doe' })
	fullName: string

	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'new' })
	type: string
}

export class CartProductDto implements CartProduct {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'link' })
	image: string

	@ApiProperty({ example: 10 })
	price: number

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ type: CartProductCategoryDto })
	category: CartProductCategory
}

export class CartGetOneResponseDto implements CartGetOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ type: CartProductDto })
	product: CartProduct

	@ApiProperty({ example: 'new' })
	status: string

	@ApiProperty({ example: 4 })
	count: number

	@ApiProperty({ type: CartUserDto })
	user: CartUser

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class CartGetAllResponseDto implements PaginationResponse<CartGetOneResponse> {
	@ApiProperty({ example: 1 })
	pageCount: number

	@ApiProperty({ example: 1 })
	pageSize: number

	@ApiProperty({ example: 1 })
	totalCount: number

	@ApiProperty({ type: CartGetOneResponseDto, isArray: true })
	data: CartGetOneResponse[]
}
