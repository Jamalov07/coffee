export declare interface PaginationResponse<T> {
	totalCount: number
	pageSize: number
	pageCount: number
	data: T[]
}
