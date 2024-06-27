import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	UserChangeRequestDto,
	UserCreateRequestDto,
	UserDeleteRequestDto,
	UserGetAllRequestDto,
	UserGetAllResponseDto,
	UserGetOneRequestDto,
	UserGetOneResponseDto,
	UserSignInRequestDto,
	UserSignInResponseDto,
	UserUpdateRequestDto,
} from './dtos'
import { UserCreateResponse, UserDeleteRequest, UserGetAllResponse, UserGetOneResponse, UserSignInResponse, UserUpdateResponse } from './interfaces'
import { END_DATE, PAGE_NUMBER, PAGE_SIZE, PAGINATION, START_DATE } from '../../constants'
import { AccessToken, RefreshToken, Roles } from '../../decorators'
import { JWTService } from '../jwt'
import { SignInTokenDefinition } from '../../interfaces'
import { CheckAuthGuard } from '../../guards'

@ApiTags('User')
@UseGuards(CheckAuthGuard)
@Controller()
export class UserController {
	private readonly service: UserService
	private readonly jwtService: JWTService
	constructor(service: UserService, jwtService: JWTService) {
		this.service = service
		this.jwtService = jwtService
	}

	@Get('users')
	@Roles('admin')
	@ApiBearerAuth()
	@ApiResponse({ type: UserGetAllResponseDto })
	@ApiResponse({ type: UserGetOneResponseDto, isArray: true })
	getAll(@Query() payload: UserGetAllRequestDto): Promise<UserGetAllResponse> {
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

	@Get('user/:id')
	@Roles('admin')
	@ApiBearerAuth()
	@ApiResponse({ type: UserGetOneResponseDto })
	getOne(@Param() payload: UserGetOneRequestDto): Promise<UserGetOneResponse> {
		return this.service.getOne(payload)
	}

	// @Post('user')
	// @ApiBearerAuth()
	// @ApiResponse({ type: null })
	// create(@Body() payload: UserCreateRequestDto): Promise<UserCreateResponse> {
	// 	return this.service.create(payload)
	// }

	@Post('access')
	@Roles('admin', 'user')
	@ApiBearerAuth()
	async updateAccessToken(@AccessToken() id: string): Promise<{ accessToken: string }> {
		const accessToken = await this.jwtService.getAccessToken({ id: id })
		return { accessToken: accessToken }
	}

	@Post('refresh')
	@Roles('admin', 'user')
	@ApiBearerAuth()
	async updateRefreshToken(@RefreshToken() id: string): Promise<SignInTokenDefinition> {
		const tokens = await this.jwtService.getTokens({ id: id })
		return tokens
	}

	@Post('me')
	@Roles('admin', 'user')
	@ApiBearerAuth()
	getMe(@AccessToken() id: string): Promise<UserGetOneResponse> {
		return this.service.getOne({ id: id })
	}

	@Post('/authentication')
	@ApiResponse({ type: UserSignInResponseDto })
	authentication(@Body() payload: UserSignInRequestDto): Promise<UserSignInResponse> {
		return this.service.signIn(payload)
	}

	@Post('/registration')
	@ApiResponse({ type: null })
	regsitration(@Body() payload: UserCreateRequestDto): Promise<UserCreateResponse> {
		return this.service.create(payload)
	}

	@Put('user/:id')
	@Roles('admin')
	@ApiBearerAuth()
	@ApiResponse({ type: null })
	put(@Param() param: UserGetOneRequestDto, @Body() payload: UserChangeRequestDto): Promise<UserUpdateResponse> {
		return this.service.put(param, payload)
	}

	@Patch('user/:id')
	@Roles('admin')
	@ApiBearerAuth()
	@ApiResponse({ type: null })
	update(@Param() param: UserGetOneRequestDto, @Body() payload: UserUpdateRequestDto): Promise<UserUpdateResponse> {
		return this.service.update(param, payload)
	}

	@Delete('user/:id')
	@Roles('admin')
	@ApiBearerAuth()
	@ApiResponse({ type: null })
	delete(@Param() param: UserDeleteRequestDto): Promise<UserDeleteRequest> {
		return this.service.delete(param)
	}
}
