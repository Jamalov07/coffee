import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	CartCreateRequest,
	CartCreateResponse,
	CartDeleteRequest,
	CartDeleteResponse,
	CartGetAllRequest,
	CartGetAllResponse,
	CartGetOneRequest,
	CartGetOneResponse,
	CartUpdateRequest,
	CartUpdateResponse,
} from './interfaces'

@Injectable()
export class CartService {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: CartGetAllRequest): Promise<CartGetAllResponse> {
		// pageNumber?: number
		// pageSize?: number
		// pagination?: boolean
		// status?: CartStatusEnum
		// userId?: string
		// productId?: string
		// startDate?: Date
		// endDate?: Date
		// sort?: 'status' | 'createdAt'
		// sortType?: 'asc' | 'desc'
		let paginationOptions = {}
		if (payload.pagination) {
			paginationOptions = {
				skip: (payload.pageNumber - 1) * payload.pageSize,
				take: payload.pageSize,
			}
		}

		const carts = await this.prisma.cart.findMany({
			where: {
				deletedAt: null,
				status: payload.status,
				productId: payload.productId,
				userId: payload.userId,
				createdAt: { lte: payload.endDate, gte: payload.startDate },
			},
			...paginationOptions,
			orderBy: [{ [payload.sort]: payload.sortType }],
			select: {
				id: true,
				status: true,
				count: true,
				user: { select: { id: true, fullName: true, email: true, type: true } },
				product: { select: { id: true, image: true, price: true, name: true, category: { select: { id: true, name: true } } } },
				createdAt: true,
			},
		})

		const count = await this.prisma.cart.count({
			where: {
				deletedAt: null,
				status: payload.status,
				productId: payload.productId,
				userId: payload.userId,
				createdAt: { lte: payload.endDate, gte: payload.startDate },
			},
		})

		if (payload.pagination) {
			return {
				pageSize: carts.length,
				totalCount: count,
				pageCount: Math.ceil(count / payload.pageSize),
				data: carts,
			}
		} else {
			return carts
		}
	}

	async getOne(payload: CartGetOneRequest): Promise<CartGetOneResponse> {
		const cart = await this.prisma.cart.findFirst({
			where: { deletedAt: null, id: payload.id },
			select: {
				id: true,
				status: true,
				count: true,
				user: { select: { id: true, fullName: true, email: true, type: true } },
				product: { select: { id: true, price: true, image: true, name: true, category: { select: { id: true, name: true } } } },
				createdAt: true,
			},
		})
		if (!cart) {
			throw new BadRequestException('Cart not found')
		}

		return cart
	}

	async create(payload: CartCreateRequest): Promise<CartCreateResponse> {
		const cart = await this.prisma.cart.findFirst({ where: { userId: payload.userId, productId: payload.productId, status: 'new' } })
		if (cart) {
			await this.prisma.cart.update({ where: { id: cart.id }, data: { count: cart.count + payload.count } })
		} else {
			await this.prisma.cart.create({ data: { userId: payload.userId, count: payload.count, productId: payload.productId } })
		}

		return null
	}

	async put(param: CartGetOneRequest, payload: CartUpdateRequest): Promise<CartUpdateResponse> {
		await this.getOne({ id: param.id })

		await this.prisma.cart.update({ where: { id: param.id, deletedAt: null }, data: { productId: payload.productId, userId: payload.userId, count: payload.count } })

		return null
	}

	async update(param: CartGetOneRequest, payload: CartUpdateRequest): Promise<CartUpdateResponse> {
		await this.getOne({ id: param.id })

		await this.prisma.cart.update({ where: { id: param.id }, data: { count: payload.count, status: payload.status } })

		return null
	}

	async delete(payload: CartDeleteRequest): Promise<CartDeleteResponse> {
		await this.getOne({ id: payload.id })

		await this.prisma.cart.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })

		return null
	}
}
