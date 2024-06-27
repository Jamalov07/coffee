import { PaginationResponse } from '../../../interfaces'

export declare type ProductGetAllResponse = PaginationResponse<ProductGetOneResponse> | ProductGetOneResponse[]

export declare interface ProductGetOneResponse {
	id: string
	name: string
	image: string
	price: number
	category: ProductCategory
	createdAt: Date
}

export declare interface ProductCategory {
	id: string
	name: string
}

export declare type ProductCreateResponse = null

export declare type ProductUpdateResponse = null

export declare type ProductDeleteResponse = null
