import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponse, SignInTokenDefinition } from '../../../interfaces'
import { UserGetOneResponse, UserSignInResponse } from '../interfaces'

export class UserGetOneResponseDto implements UserGetOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: new Date() })
	createdAt: Date

	@ApiProperty({ example: 'uuid@gmail.com' })
	email: string

	@ApiProperty({ example: 'john doe' })
	fullName: string

	@ApiProperty({ example: 'uuid123' })
	password?: string

	@ApiProperty({ example: 'user' })
	type: string
}

export class UserGetAllResponseDto implements PaginationResponse<UserGetOneResponse> {
	@ApiProperty({ example: 4 })
	pageCount: number

	@ApiProperty({ example: 4 })
	pageSize: number

	@ApiProperty({ example: 4 })
	totalCount: number

	@ApiProperty({ type: UserGetOneResponseDto, isArray: true })
	data: UserGetOneResponse[]
}

export class SignInTokenDefinitionDto implements SignInTokenDefinition {
	@ApiProperty({ example: 'eyjjgdjb...' })
	accessToken: string

	@ApiProperty({ example: 'eyjjgdjb...' })
	refreshToken: string
}

export class UserSignInResponseDto implements UserSignInResponse {
	@ApiProperty({ type: SignInTokenDefinitionDto })
	tokens: SignInTokenDefinition

	@ApiProperty({ type: UserGetOneResponseDto })
	user: UserGetOneResponse
}
