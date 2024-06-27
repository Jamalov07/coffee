import { PaginationResponse } from '../../../interfaces'

export declare type CategoryGetAllResponse = PaginationResponse<CategoryGetOneResponse> | CategoryGetOneResponse[]

export declare interface CategoryGetOneResponse {
	id: string
	name: string
	createdAt: Date
}

export declare type CategoryCreateResponse = null

export declare type CategoryUpdateResponse = null

export declare type CategoryDeleteResponse = null
