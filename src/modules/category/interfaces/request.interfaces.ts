export declare interface CategoryGetAllRequest {
	pageNumber?: number
	pageSize?: number
	pagination?: boolean
	name?: string
	startDate?: Date
	endDate?: Date
	sort?: 'name' | 'createdAt'
	sortType?: 'asc' | 'desc'
}

export declare interface CategoryGetOneRequest {
	id: string
}

export declare interface CategoryCreateRequest {
	name: string
}

export declare interface CategoryUpdateRequest {
	name?: string
}

export declare interface CategoryDeleteRequest {
	id: string
}
