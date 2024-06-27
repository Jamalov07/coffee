import { PaginationResponse, SignInTokenDefinition } from '../../../interfaces'

export declare type UserGetAllResponse = PaginationResponse<UserGetOneResponse> | UserGetOneResponse[]

export declare interface UserGetOneResponse {
	id: string
	fullName: string
	type: string
	email: string
	password?: string
	createdAt: Date
}

export declare interface UserSignInResponse {
	user: UserGetOneResponse
	tokens: SignInTokenDefinition
}

export declare type UserCreateResponse = null

export declare type UserUpdateResponse = null

export declare type UserDeleteResponse = null
