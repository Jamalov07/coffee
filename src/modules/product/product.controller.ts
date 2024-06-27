import { BadGatewayException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ProductService } from './product.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	ProductChangeRequestDto,
	ProductCreateRequestDto,
	ProductDeleteRequestDto,
	ProductGetAllRequestDto,
	ProductGetAllResponseDto,
	ProductGetOneRequestDto,
	ProductGetOneResponseDto,
	ProductUpdateRequestDto,
} from './dtos'
import { ProductCreateResponse, ProductDeleteRequest, ProductGetAllResponse, ProductGetOneResponse, ProductUpdateResponse } from './interfaces'
import { END_DATE, PAGE_NUMBER, PAGE_SIZE, PAGINATION, START_DATE } from '../../constants'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { CheckAuthGuard } from '../../guards'
import { Roles } from '../../decorators'

@ApiTags('Product')
@UseGuards(CheckAuthGuard)
@ApiBearerAuth()
@Controller()
export class ProductController {
	private readonly service: ProductService
	constructor(service: ProductService) {
		this.service = service
	}

	@Get('products')
	@Roles('admin', 'user')
	@ApiResponse({ type: ProductGetAllResponseDto })
	@ApiResponse({ type: ProductGetOneResponseDto, isArray: true })
	getAll(@Query() payload: ProductGetAllRequestDto): Promise<ProductGetAllResponse> {
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

	@Get('product/:id')
	@Roles('user', 'admin')
	@ApiResponse({ type: ProductGetOneResponseDto })
	getOne(@Param() payload: ProductGetOneRequestDto): Promise<ProductGetOneResponse> {
		return this.service.getOne(payload)
	}

	@Post('product')
	@Roles('admin')
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: join(__dirname, '..', '..', '..', 'images'),
				filename: (req, file, callback) => {
					const uniqueSuffix = `${uuidv4()}-${Date.now()}`
					const ext = extname(file.originalname)
					const filename = `${uniqueSuffix}${ext}`
					callback(null, filename)
				},
			}),
			fileFilter: (req, file, callback) => {
				if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
					return callback(new BadGatewayException('Only image files are allowed!'), false)
				}
				callback(null, true)
			},
		}),
	)
	@ApiResponse({ type: null })
	create(@Body() payload: ProductCreateRequestDto, @UploadedFile() file: Express.Multer.File): Promise<ProductCreateResponse> {
		const imagePath = file ? `/${file.filename}` : ''
		return this.service.create(payload, imagePath)
	}

	@Put('product/:id')
	@Roles('admin')
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: join(__dirname, '..', '..', '..', 'images'),
				filename: (req, file, callback) => {
					const uniqueSuffix = `${uuidv4()}-${Date.now()}`
					const ext = extname(file.originalname)
					const filename = `${uniqueSuffix}${ext}`
					callback(null, filename)
				},
			}),
			fileFilter: (req, file, callback) => {
				if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
					return callback(new BadGatewayException('Only image files are allowed!'), false)
				}
				callback(null, true)
			},
		}),
	)
	@ApiResponse({ type: null })
	put(@Param() param: ProductGetOneRequestDto, @Body() payload: ProductChangeRequestDto, @UploadedFile() file: Express.Multer.File): Promise<ProductUpdateResponse> {
		const imagePath = file ? `/${file.filename}` : ''

		return this.service.put(param, payload, imagePath)
	}

	@Patch('product/:id')
	@Roles('admin')
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: join(__dirname, '..', '..', '..', 'images'),
				filename: (req, file, callback) => {
					const uniqueSuffix = `${uuidv4()}-${Date.now()}`
					const ext = extname(file.originalname)
					const filename = `${uniqueSuffix}${ext}`
					callback(null, filename)
				},
			}),
			fileFilter: (req, file, callback) => {
				if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
					return callback(new BadGatewayException('Only image files are allowed!'), false)
				}
				callback(null, true)
			},
		}),
	)
	@ApiResponse({ type: null })
	update(@Param() param: ProductGetOneRequestDto, @Body() payload: ProductUpdateRequestDto, @UploadedFile() file: Express.Multer.File): Promise<ProductUpdateResponse> {
		const imagePath = file ? `/${file.filename}` : ''
		return this.service.update(param, payload, imagePath)
	}

	@Delete('product/:id')
	@Roles('admin')
	@ApiResponse({ type: null })
	delete(@Param() param: ProductDeleteRequestDto): Promise<ProductDeleteRequest> {
		return this.service.delete(param)
	}
}
