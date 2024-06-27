import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	ProductCreateRequest,
	ProductCreateResponse,
	ProductDeleteRequest,
	ProductDeleteResponse,
	ProductGetAllRequest,
	ProductGetAllResponse,
	ProductGetOneRequest,
	ProductGetOneResponse,
	ProductUpdateRequest,
	ProductUpdateResponse,
} from './interfaces'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class ProductService {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: ProductGetAllRequest): Promise<ProductGetAllResponse> {
		let paginationOptions = {}
		if (payload.pagination) {
			paginationOptions = {
				skip: (payload.pageNumber - 1) * payload.pageSize,
				take: payload.pageSize,
			}
		}

		const products = await this.prisma.product.findMany({
			where: {
				deletedAt: null,
				name: { contains: payload.name, mode: 'insensitive' },
				createdAt: { lte: payload.endDate, gte: payload.startDate },
				categoryId: payload.categoryId,
			},
			...paginationOptions,
			orderBy: [{ [payload.sort]: payload.sortType }],
			select: {
				id: true,
				name: true,
				image: true,
				price: true,
				createdAt: true,
				category: { select: { id: true, name: true } },
			},
		})

		const count = await this.prisma.product.count({
			where: {
				deletedAt: null,
				name: { contains: payload.name, mode: 'insensitive' },
				createdAt: { lte: payload.endDate, gte: payload.startDate },
				categoryId: payload.categoryId,
			},
		})

		if (payload.pagination) {
			return {
				pageSize: products.length,
				totalCount: count,
				pageCount: Math.ceil(count / payload.pageSize),
				data: products,
			}
		} else {
			return products
		}
	}

	async getOne(payload: ProductGetOneRequest): Promise<ProductGetOneResponse> {
		const product = await this.prisma.product.findFirst({
			where: { deletedAt: null, id: payload.id },
			select: {
				id: true,
				name: true,
				image: true,
				price: true,
				createdAt: true,
				category: { select: { id: true, name: true } },
			},
		})
		if (!product) {
			throw new BadRequestException('Product not found')
		}

		return product
	}

	async create(payload: ProductCreateRequest, image: string): Promise<ProductCreateResponse> {
		const candidate = await this.prisma.product.findFirst({ where: { deletedAt: null, name: payload.name } })
		if (candidate) {
			throw new BadRequestException('Product with this name already exists')
		}
		await this.prisma.product.create({ data: { name: payload.name, categoryId: payload.categoryId, image: image, price: payload.price } })
		return null
	}

	async put(param: ProductGetOneRequest, payload: ProductCreateRequest, image: string): Promise<ProductUpdateResponse> {
		const product = await this.getOne({ id: param.id })
		const candidate = await this.prisma.product.findFirst({ where: { deletedAt: null, name: payload.name, id: { not: param.id } } })
		if (candidate) {
			throw new BadRequestException('Product with this name already exists')
		}
		if (product.image) {
			this.deleteImageFile(product.image)
		}
		await this.prisma.product.update({ where: { id: param.id }, data: { name: payload.name, categoryId: payload.categoryId, image: image, price: payload.price } })

		return null
	}

	async update(param: ProductGetOneRequest, payload: ProductUpdateRequest, image?: string): Promise<ProductUpdateResponse> {
		const product = await this.getOne({ id: param.id })

		if (payload.name) {
			const candidate = await this.prisma.product.findFirst({ where: { deletedAt: null, name: payload.name, id: { not: param.id } } })
			if (candidate) {
				throw new BadRequestException('Product with this name already exists')
			}
		}

		let imagePath = product.image
		if (image) {
			this.deleteImageFile(product.image)
			imagePath = image
		}

		await this.prisma.product.update({ where: { id: param.id }, data: { name: payload.name, categoryId: payload.categoryId, image: imagePath, price: payload.price } })

		return null
	}

	async delete(payload: ProductDeleteRequest): Promise<ProductDeleteResponse> {
		// const product =
		await this.getOne({ id: payload.id })

		// if (product.image) {
		// 	this.deleteImageFile(product.image)
		// }
		await this.prisma.product.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })

		return null
	}

	private deleteImageFile(imagePath: string): void {
		const filePath = path.join(__dirname, '..', '..', '..', 'images', imagePath)
		fs.unlink(filePath, (err) => {
			if (err) {
				console.error(`Failed to delete image file: ${filePath}`, err)
			}
		})
	}
}
