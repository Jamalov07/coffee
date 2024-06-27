import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	CategoryCreateRequest,
	CategoryCreateResponse,
	CategoryDeleteRequest,
	CategoryDeleteResponse,
	CategoryGetAllRequest,
	CategoryGetAllResponse,
	CategoryGetOneRequest,
	CategoryGetOneResponse,
	CategoryUpdateRequest,
	CategoryUpdateResponse,
} from './interfaces'

@Injectable()
export class CategoryService {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: CategoryGetAllRequest): Promise<CategoryGetAllResponse> {
		let paginationOptions = {}
		if (payload.pagination) {
			paginationOptions = {
				skip: (payload.pageNumber - 1) * payload.pageSize,
				take: payload.pageSize,
			}
		}

		const categories = await this.prisma.category.findMany({
			where: {
				deletedAt: null,
				name: { contains: payload.name, mode: 'insensitive' },
				createdAt: { lte: payload.endDate, gte: payload.startDate },
			},
			...paginationOptions,
			orderBy: [{ [payload.sort]: payload.sortType }],
		})

		const count = await this.prisma.category.count({
			where: {
				deletedAt: null,
				name: { contains: payload.name, mode: 'insensitive' },
				createdAt: { lte: payload.endDate, gte: payload.startDate },
			},
		})

		if (payload.pagination) {
			return {
				pageSize: categories.length,
				totalCount: count,
				pageCount: Math.ceil(count / payload.pageSize),
				data: categories,
			}
		} else {
			return categories
		}
	}

	async getOne(payload: CategoryGetOneRequest): Promise<CategoryGetOneResponse> {
		const category = await this.prisma.category.findFirst({ where: { deletedAt: null, id: payload.id } })
		if (!category) {
			throw new BadRequestException('Category not found')
		}

		return category
	}

	async create(payload: CategoryCreateRequest): Promise<CategoryCreateResponse> {
		const candidate = await this.prisma.category.findFirst({ where: { deletedAt: null, name: payload.name } })
		if (candidate) {
			throw new BadRequestException('Category with this name already exists')
		}
		await this.prisma.category.create({ data: { name: payload.name } })
		return null
	}

	async put(param: CategoryGetOneRequest, payload: CategoryUpdateRequest): Promise<CategoryUpdateResponse> {
		await this.getOne({ id: param.id })
		const candidate = await this.prisma.category.findFirst({ where: { deletedAt: null, name: payload.name, id: { not: param.id } } })
		if (candidate) {
			throw new BadRequestException('Category with this name already exists')
		}

		await this.prisma.category.update({ where: { id: param.id }, data: { name: payload.name } })

		return null
	}

	async update(param: CategoryGetOneRequest, payload: CategoryUpdateRequest): Promise<CategoryUpdateResponse> {
		await this.getOne({ id: param.id })

		if (payload.name) {
			const candidate = await this.prisma.category.findFirst({ where: { deletedAt: null, name: payload.name, id: { not: param.id } } })
			if (candidate) {
				throw new BadRequestException('Category with this name already exists')
			}
		}

		await this.prisma.category.update({ where: { id: param.id }, data: { name: payload.name } })

		return null
	}

	async delete(payload: CategoryDeleteRequest): Promise<CategoryDeleteResponse> {
		await this.getOne({ id: payload.id })

		await this.prisma.category.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })

		return null
	}
}
