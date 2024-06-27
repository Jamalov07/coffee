import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma'
import * as bcrypt from 'bcrypt'
import {
	UserCreateRequest,
	UserCreateResponse,
	UserDeleteRequest,
	UserDeleteResponse,
	UserGetAllRequest,
	UserGetAllResponse,
	UserGetOneRequest,
	UserGetOneResponse,
	UserSignInRequest,
	UserSignInResponse,
	UserUpdateRequest,
	UserUpdateResponse,
} from './interfaces'
import { JWTService } from '../jwt'

@Injectable()
export class UserService {
	private readonly prisma: PrismaService
	private readonly jwtService: JWTService
	constructor(prisma: PrismaService, jwtService: JWTService) {
		this.prisma = prisma
		this.jwtService = jwtService
	}

	async getAll(payload: UserGetAllRequest): Promise<UserGetAllResponse> {
		let paginationOptions = {}
		if (payload.pagination) {
			paginationOptions = {
				skip: (payload.pageNumber - 1) * payload.pageSize,
				take: payload.pageSize,
			}
		}

		const users = await this.prisma.user.findMany({
			where: {
				deletedAt: null,
				type: payload.type,
				email: { contains: payload.fullName, mode: 'insensitive' },
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				createdAt: { lte: payload.endDate, gte: payload.startDate },
			},
			...paginationOptions,
			orderBy: [{ [payload.sort]: payload.sortType }],
			select: {
				id: true,
				fullName: true,
				email: true,
				type: true,
				password: true,
				createdAt: true,
			},
		})

		const count = await this.prisma.user.count({
			where: {
				deletedAt: null,
				type: payload.type,
				email: { contains: payload.fullName, mode: 'insensitive' },
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				createdAt: { lte: payload.endDate, gte: payload.startDate },
			},
		})

		if (payload.pagination) {
			return {
				pageSize: users.length,
				totalCount: count,
				pageCount: Math.ceil(count / payload.pageSize),
				data: users,
			}
		} else {
			return users
		}
	}

	async getOne(payload: UserGetOneRequest): Promise<UserGetOneResponse> {
		const user = await this.prisma.user.findFirst({
			where: { deletedAt: null, id: payload.id },
			select: {
				id: true,
				fullName: true,
				email: true,
				type: true,
				password: true,
				createdAt: true,
			},
		})
		if (!user) {
			throw new BadRequestException('User not found')
		}

		return user
	}

	async create(payload: UserCreateRequest): Promise<UserCreateResponse> {
		const candidate = await this.prisma.user.findFirst({ where: { deletedAt: null, email: payload.email } })
		if (candidate) {
			throw new BadRequestException('User with this email already exists')
		}
		const password = await bcrypt.hash(payload.password, 7)

		await this.prisma.user.create({ data: { fullName: payload.fullName, email: payload.email, type: payload.type, password: password } })
		return null
	}

	async signIn(payload: UserSignInRequest): Promise<UserSignInResponse> {
		const user = await this.prisma.user.findFirst({
			where: { deletedAt: null, email: payload.email },
			select: {
				id: true,
				fullName: true,
				email: true,
				type: true,
				password: true,
				createdAt: true,
			},
		})
		if (!user) {
			throw new UnauthorizedException('User not found')
		}

		const isCorrect = await bcrypt.compare(payload.password, user.password)

		if (!isCorrect) {
			throw new UnauthorizedException('User not found')
		}

		const tokens = await this.jwtService.getTokens({ id: user.id })

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...userWithoutPassword } = user

		return { user: userWithoutPassword, tokens: tokens }
	}

	async put(param: UserGetOneRequest, payload: UserCreateRequest): Promise<UserUpdateResponse> {
		await this.getOne({ id: param.id })
		const candidate = await this.prisma.user.findFirst({ where: { deletedAt: null, email: payload.email } })
		if (candidate) {
			throw new BadRequestException('User with this email already exists')
		}
		const password = await bcrypt.hash(payload.password, 7)

		await this.prisma.user.update({ where: { id: param.id }, data: { fullName: payload.fullName, email: payload.email, type: payload.type, password: password } })

		return null
	}

	async update(param: UserGetOneRequest, payload: UserUpdateRequest): Promise<UserUpdateResponse> {
		await this.getOne({ id: param.id })

		if (payload.email) {
			const candidate = await this.prisma.user.findFirst({ where: { deletedAt: null, email: payload.email, id: { not: param.id } } })
			if (candidate) {
				throw new BadRequestException('User with this email already exists')
			}
		}
		const password = payload.password ? await bcrypt.hash(payload.password, 7) : undefined

		await this.prisma.user.update({ where: { id: param.id }, data: { fullName: payload.fullName, email: payload.email, type: payload.type, password: password } })

		return null
	}

	async delete(payload: UserDeleteRequest): Promise<UserDeleteResponse> {
		await this.getOne({ id: payload.id })

		await this.prisma.user.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })

		return null
	}
}
