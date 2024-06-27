import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponse } from '../../../interfaces'
import { OrderGetOneResponse, OrderProduct, OrderProductCategory, OrderUser } from '../interfaces'

export class OrderProductCategoryDto implements OrderProductCategory {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string
}

export class OrderUserDto implements OrderUser {
	@ApiProperty({ example: 'email@gmail.com' })
	email: string

	@ApiProperty({ example: 'fullname' })
	fullName: string

	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'user' })
	type: string
}

export class OrderProductDto implements OrderProduct {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'link' })
	image: string

	@ApiProperty({ example: 10 })
	price: number

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ type: OrderProductCategoryDto })
	category: OrderProductCategory
}

export class OrderGetOneResponseDto implements OrderGetOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: OrderProductDto })
	product: OrderProduct

	@ApiProperty({ example: 'new' })
	status: string

	@ApiProperty({ example: 2 })
	count: number

	@ApiProperty({ example: OrderUserDto })
	user: OrderUser

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class OrderGetAllResponseDto implements PaginationResponse<OrderGetOneResponse> {
	@ApiProperty({ example: 4 })
	pageCount: number

	@ApiProperty({ example: 4 })
	pageSize: number

	@ApiProperty({ example: 4 })
	totalCount: number

	@ApiProperty({ type: OrderGetOneResponseDto, isArray: true })
	data: OrderGetOneResponse[]
}
