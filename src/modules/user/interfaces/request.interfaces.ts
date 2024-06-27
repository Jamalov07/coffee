import { UserTypeEnum } from '@prisma/client'

export declare interface UserGetAllRequest {
	pageNumber?: number
	pageSize?: number
	pagination?: boolean
	fullName?: string
	email?: string
	type?: UserTypeEnum
	startDate?: Date
	endDate?: Date
	sort?: 'fullName' | 'createdAt'
	sortType?: 'asc' | 'desc'
}

export declare interface UserGetOneRequest {
	id: string
}

export declare interface UserCreateRequest {
	fullName: string
	type: UserTypeEnum
	email: string
	password: string
}

export declare interface UserSignInRequest {
	email: string
	password: string
}

export declare interface UserUpdateRequest {
	fullName?: string
	type?: UserTypeEnum
	email?: string
	password?: string
}

export declare interface UserDeleteRequest {
	id: string
}
