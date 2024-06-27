import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	CategoryChangeRequestDto,
	CategoryCreateRequestDto,
	CategoryDeleteRequestDto,
	CategoryGetAllRequestDto,
	CategoryGetAllResponseDto,
	CategoryGetOneRequestDto,
	CategoryGetOneResponseDto,
	CategoryUpdateRequestDto,
} from './dtos'
import { CategoryCreateResponse, CategoryDeleteRequest, CategoryGetAllResponse, CategoryGetOneResponse, CategoryUpdateResponse } from './interfaces'
import { END_DATE, PAGE_NUMBER, PAGE_SIZE, PAGINATION, START_DATE } from '../../constants'
import { CheckAuthGuard } from '../../guards'
import { Roles } from '../../decorators'

@ApiTags('Category')
@UseGuards(CheckAuthGuard)
@ApiBearerAuth()
@Controller()
export class CategoryController {
	private readonly service: CategoryService
	constructor(service: CategoryService) {
		this.service = service
	}

	@Get('categories')
	@Roles('admin', 'user')
	@ApiResponse({ type: CategoryGetAllResponseDto })
	@ApiResponse({ type: CategoryGetOneResponseDto, isArray: true })
	getAll(@Query() payload: CategoryGetAllRequestDto): Promise<CategoryGetAllResponse> {
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

	@Get('category/:id')
	@Roles('user', 'admin')
	@ApiResponse({ type: CategoryGetOneResponseDto })
	getOne(@Param() payload: CategoryGetOneRequestDto): Promise<CategoryGetOneResponse> {
		return this.service.getOne(payload)
	}

	@Post('category')
	@Roles('admin')
	@ApiResponse({ type: null })
	create(@Body() payload: CategoryCreateRequestDto): Promise<CategoryCreateResponse> {
		return this.service.create(payload)
	}

	@Put('category/:id')
	@Roles('admin')
	@ApiResponse({ type: null })
	put(@Param() param: CategoryGetOneRequestDto, @Body() payload: CategoryChangeRequestDto): Promise<CategoryUpdateResponse> {
		return this.service.put(param, payload)
	}

	@Patch('category/:id')
	@Roles('admin')
	@ApiResponse({ type: null })
	update(@Param() param: CategoryGetOneRequestDto, @Body() payload: CategoryUpdateRequestDto): Promise<CategoryUpdateResponse> {
		return this.service.update(param, payload)
	}

	@Delete('category/:id')
	@Roles('admin')
	@ApiResponse({ type: null })
	delete(@Param() param: CategoryDeleteRequestDto): Promise<CategoryDeleteRequest> {
		return this.service.delete(param)
	}
}
