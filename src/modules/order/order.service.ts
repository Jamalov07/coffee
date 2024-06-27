import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	OrderCreateRequest,
	OrderCreateResponse,
	OrderDeleteRequest,
	OrderDeleteResponse,
	OrderGetAllRequest,
	OrderGetAllResponse,
	OrderGetOneRequest,
	OrderGetOneResponse,
	OrderUpdateRequest,
	OrderUpdateResponse,
} from './interfaces'

@Injectable()
export class OrderService {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: OrderGetAllRequest): Promise<OrderGetAllResponse> {
		let paginationOptions = {}
		if (payload.pagination) {
			paginationOptions = {
				skip: (payload.pageNumber - 1) * payload.pageSize,
				take: payload.pageSize,
			}
		}

		const orders = await this.prisma.order.findMany({
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
				orderID: true,
				status: true,
				count: true,
				user: { select: { id: true, fullName: true, email: true, type: true } },
				product: { select: { id: true, image: true, price: true, name: true, category: { select: { id: true, name: true } } } },
				createdAt: true,
			},
		})

		const count = await this.prisma.order.count({
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
				pageSize: orders.length,
				totalCount: count,
				pageCount: Math.ceil(count / payload.pageSize),
				data: orders,
			}
		} else {
			return orders
		}
	}

	async getOne(payload: OrderGetOneRequest): Promise<OrderGetOneResponse> {
		const order = await this.prisma.order.findFirst({
			where: { deletedAt: null, id: payload.id },
			select: {
				id: true,
				orderID: true,
				status: true,
				count: true,
				user: { select: { id: true, fullName: true, email: true, type: true } },
				product: { select: { id: true, image: true, price: true, name: true, category: { select: { id: true, name: true } } } },
				createdAt: true,
			},
		})
		if (!order) {
			throw new BadRequestException('Order not found')
		}

		return order
	}

	async create(payload: OrderCreateRequest): Promise<OrderCreateResponse> {
		const cart = await this.prisma.cart.findFirst({ where: { id: payload.cartId, deletedAt: null, status: 'new' } })

		if (!cart) {
			throw new BadRequestException('Cart not found')
		}
		await this.prisma.cart.update({ where: { id: cart.id }, data: { status: 'ordered' } })

		await this.prisma.order.create({ data: { count: cart.count, userId: cart.userId, productId: cart.productId } })

		return null
	}

	async put(param: OrderGetOneRequest, payload: OrderUpdateRequest): Promise<OrderUpdateResponse> {
		await this.getOne({ id: param.id })

		await this.prisma.order.update({ where: { id: param.id, deletedAt: null }, data: { productId: payload.productId, userId: payload.userId, count: payload.count } })

		return null
	}

	async update(param: OrderGetOneRequest, payload: OrderUpdateRequest): Promise<OrderUpdateResponse> {
		await this.getOne({ id: param.id })

		await this.prisma.order.update({ where: { id: param.id }, data: { count: payload.count, status: payload.status, userId: payload.userId, productId: payload.productId } })

		return null
	}

	async delete(payload: OrderDeleteRequest): Promise<OrderDeleteResponse> {
		await this.getOne({ id: payload.id })

		await this.prisma.order.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })

		return null
	}
}
