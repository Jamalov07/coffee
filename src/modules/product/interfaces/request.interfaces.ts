export declare interface ProductGetAllRequest {
	pageNumber?: number
	pageSize?: number
	pagination?: boolean
	name?: string
	categoryId?: string
	startDate?: Date
	endDate?: Date
	sort?: 'name' | 'createdAt'
	sortType?: 'asc' | 'desc'
}

export declare interface ProductGetOneRequest {
	id: string
}

export declare interface ProductCreateRequest {
	name: string
	price: number
	categoryId: string
}

export declare interface ProductUpdateRequest {
	name?: string
	price?: number
	categoryId?: string
}

export declare interface ProductDeleteRequest {
	id: string
}
