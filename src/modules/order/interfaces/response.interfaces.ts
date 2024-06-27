import { PaginationResponse } from '../../../interfaces'

export declare type OrderGetAllResponse = PaginationResponse<OrderGetOneResponse> | OrderGetOneResponse[]

export declare interface OrderGetOneResponse {
	id: string
	status: string
	count: number
	user: OrderUser
	product: OrderProduct
	createdAt: Date
}

export declare interface OrderUser {
	id: string
	fullName: string
	type: string
	email: string
}

export declare interface OrderProduct {
	id: string
	name: string
	price: number
	category: OrderProductCategory
	image: string
}

export declare interface OrderProductCategory {
	id: string
	name: string
}

export declare type OrderCreateResponse = null

export declare type OrderUpdateResponse = null

export declare type OrderDeleteResponse = null
