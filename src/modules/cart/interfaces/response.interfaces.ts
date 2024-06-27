import { PaginationResponse } from '../../../interfaces'

export declare type CartGetAllResponse = PaginationResponse<CartGetOneResponse> | CartGetOneResponse[]

export declare interface CartGetOneResponse {
	id: string
	status: string
	count: number
	user: CartUser
	product: CartProduct
	createdAt: Date
}

export declare interface CartUser {
	id: string
	fullName: string
	type: string
	email: string
}

export declare interface CartProduct {
	id: string
	name: string
	price: number
	category: CartProductCategory
	image: string
}

export declare interface CartProductCategory {
	id: string
	name: string
}

export declare type CartCreateResponse = null

export declare type CartUpdateResponse = null

export declare type CartDeleteResponse = null
