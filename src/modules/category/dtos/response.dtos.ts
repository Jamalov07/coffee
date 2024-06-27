import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponse } from '../../../interfaces'
import { CategoryGetOneResponse } from '../interfaces'

export class CategoryGetOneResponseDto implements CategoryGetOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class CategoryGetAllResponseDto implements PaginationResponse<CategoryGetOneResponse> {
	@ApiProperty({ example: 4 })
	pageCount: number

	@ApiProperty({ example: 4 })
	pageSize: number

	@ApiProperty({ example: 4 })
	totalCount: number

	@ApiProperty({ example: CategoryGetOneResponseDto, isArray: true })
	data: CategoryGetOneResponse[]
}
