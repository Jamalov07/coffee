import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common'
import { CartService } from './cart.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	CartChangeRequestDto,
	CartCreateRequestDto,
	CartDeleteRequestDto,
	CartGetAllRequestDto,
	CartGetAllResponseDto,
	CartGetOneRequestDto,
	CartGetOneResponseDto,
	CartUpdateRequestDto,
} from './dtos'
import { CartCreateResponse, CartDeleteRequest, CartGetAllResponse, CartGetOneResponse, CartUpdateResponse } from './interfaces'
import { END_DATE, PAGE_NUMBER, PAGE_SIZE, PAGINATION, START_DATE } from '../../constants'
import { CheckAuthGuard } from '../../guards'
import { AccessToken, Roles } from '../../decorators'

@ApiTags('Cart')
@UseGuards(CheckAuthGuard)
@ApiBearerAuth()
@Controller()
export class CartController {
	private readonly service: CartService
	constructor(service: CartService) {
		this.service = service
	}

	@Get('carts')
	@Roles('admin')
	@ApiResponse({ type: CartGetAllResponseDto })
	@ApiResponse({ type: CartGetOneResponseDto, isArray: true })
	getAll(@Query() payload: CartGetAllRequestDto): Promise<CartGetAllResponse> {
		return this.service.getAll({
			...payload,
			endDate: payload.endDate ?? END_DATE,
			startDate: payload.startDate ?? START_DATE,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
			sort: payload.sort ?? 'createdAt',
			sortType: payload.sortType ?? 'desc',
			pagination: payload.pagination === true ? PAGINATION : false,
		})
	}

	@Get('carts/my')
	@Roles('user')
	@ApiResponse({ type: CartGetAllResponseDto })
	@ApiResponse({ type: CartGetOneResponseDto, isArray: true })
	getAllMy(@Query() payload: CartGetAllRequestDto, @AccessToken() id: string): Promise<CartGetAllResponse> {
		return this.service.getAll({
			...payload,
			endDate: payload.endDate ?? END_DATE,
			startDate: payload.startDate ?? START_DATE,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
			sort: payload.sort ?? 'createdAt',
			sortType: payload.sortType ?? 'desc',
			pagination: Boolean(payload.pagination) === true ? PAGINATION : false,
			userId: id,
		})
	}

	@Get('cart/:id')
	@Roles('admin')
	@ApiResponse({ type: CartGetOneResponseDto })
	getOne(@Param() payload: CartGetOneRequestDto): Promise<CartGetOneResponse> {
		return this.service.getOne(payload)
	}

	@Post('cart')
	@Roles('user')
	@ApiResponse({ type: null })
	create(@Body() payload: CartCreateRequestDto): Promise<CartCreateResponse> {
		return this.service.create(payload)
	}

	@Put('cart/:id')
	@Roles('admin')
	@ApiResponse({ type: null })
	put(@Param() param: CartGetOneRequestDto, @Body() payload: CartChangeRequestDto): Promise<CartUpdateResponse> {
		return this.service.put(param, payload)
	}

	@Patch('cart/:id')
	@Roles('user', 'admin')
	@ApiResponse({ type: null })
	update(@Param() param: CartGetOneRequestDto, @Body() payload: CartUpdateRequestDto): Promise<CartUpdateResponse> {
		return this.service.update(param, payload)
	}

	@Delete('cart/:id')
	@Roles('user', 'admin')
	@ApiResponse({ type: null })
	delete(@Param() param: CartDeleteRequestDto): Promise<CartDeleteRequest> {
		return this.service.delete(param)
	}
}
