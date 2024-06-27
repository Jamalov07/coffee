import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	OrderChangeRequestDto,
	OrderCreateRequestDto,
	OrderDeleteRequestDto,
	OrderGetAllRequestDto,
	OrderGetAllResponseDto,
	OrderGetOneRequestDto,
	OrderGetOneResponseDto,
	OrderUpdateRequestDto,
} from './dtos'
import { OrderCreateResponse, OrderDeleteRequest, OrderGetAllResponse, OrderGetOneResponse, OrderUpdateResponse } from './interfaces'
import { END_DATE, PAGE_NUMBER, PAGE_SIZE, PAGINATION, START_DATE } from '../../constants'
import { CheckAuthGuard } from '../../guards'
import { AccessToken, Roles } from '../../decorators'

@ApiTags('Order')
@UseGuards(CheckAuthGuard)
@ApiBearerAuth()
@Controller()
export class OrderController {
	private readonly service: OrderService
	constructor(service: OrderService) {
		this.service = service
	}

	@Get('orders')
	@Roles('admin')
	@ApiResponse({ type: OrderGetAllResponseDto })
	@ApiResponse({ type: OrderGetOneResponseDto, isArray: true })
	getAll(@Query() payload: OrderGetAllRequestDto): Promise<OrderGetAllResponse> {
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

	@Get('orders/my')
	@Roles('user')
	@ApiResponse({ type: OrderGetAllResponseDto })
	@ApiResponse({ type: OrderGetOneResponseDto, isArray: true })
	getAllMy(@Query() payload: OrderGetAllRequestDto, @AccessToken() id: string): Promise<OrderGetAllResponse> {
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

	@Get('order/:id')
	@Roles('admin')
	@ApiResponse({ type: OrderGetOneResponseDto })
	getOne(@Param() payload: OrderGetOneRequestDto): Promise<OrderGetOneResponse> {
		return this.service.getOne(payload)
	}

	@Post('order')
	@Roles('user')
	@ApiResponse({ type: null })
	create(@Body() payload: OrderCreateRequestDto): Promise<OrderCreateResponse> {
		return this.service.create(payload)
	}

	@Put('order/:id')
	@Roles('admin')
	@ApiResponse({ type: null })
	put(@Param() param: OrderGetOneRequestDto, @Body() payload: OrderChangeRequestDto): Promise<OrderUpdateResponse> {
		return this.service.put(param, payload)
	}

	@Patch('order/:id')
	@Roles('user', 'admin')
	@ApiResponse({ type: null })
	update(@Param() param: OrderGetOneRequestDto, @Body() payload: OrderUpdateRequestDto): Promise<OrderUpdateResponse> {
		return this.service.update(param, payload)
	}

	@Delete('order/:id')
	@Roles('admin')
	@ApiResponse({ type: null })
	delete(@Param() param: OrderDeleteRequestDto): Promise<OrderDeleteRequest> {
		return this.service.delete(param)
	}
}
