import { OrderStatusEnum } from '@prisma/client'

export declare interface OrderGetAllRequest {
	pageNumber?: number
	pageSize?: number
	pagination?: boolean
	status?: OrderStatusEnum
	userId?: string
	productId?: string
	startDate?: Date
	endDate?: Date
	sort?: 'status' | 'createdAt'
	sortType?: 'asc' | 'desc'
}

export declare interface OrderGetOneRequest {
	id: string
}

export declare interface OrderCreateRequest {
	cartId: string
}

export declare interface OrderUpdateRequest {
	userId?: string
	productId?: string
	status?: OrderStatusEnum
	count?: number
}

export declare interface OrderDeleteRequest {
	id: string
}
