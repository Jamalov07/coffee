import { CartStatusEnum } from '@prisma/client'

export declare interface CartGetAllRequest {
	pageNumber?: number
	pageSize?: number
	pagination?: boolean
	status?: CartStatusEnum
	userId?: string
	productId?: string
	startDate?: Date
	endDate?: Date
	sort?: 'status' | 'createdAt'
	sortType?: 'asc' | 'desc'
}

export declare interface CartGetOneRequest {
	id: string
}

export declare interface CartCreateRequest {
	userId: string
	productId: string
	count: number
}

export declare interface CartUpdateRequest {
	userId?: string
	productId?: string
	status?: CartStatusEnum
	count?: number
}

export declare interface CartDeleteRequest {
	id: string
}
