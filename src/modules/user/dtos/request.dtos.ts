import { $Enums } from '@prisma/client'
import { UserCreateRequest, UserDeleteRequest, UserGetAllRequest, UserGetOneRequest, UserSignInRequest, UserUpdateRequest } from '../interfaces'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBooleanString, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

export class UserGetAllRequestDto implements UserGetAllRequest {
	@ApiPropertyOptional({ example: true })
	@IsBooleanString()
	@IsOptional()
	pagination?: boolean

	@ApiPropertyOptional({ example: 1 })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	pageNumber?: number

	@ApiPropertyOptional({ example: 10 })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	pageSize?: number

	@ApiPropertyOptional({ example: new Date(0) })
	@IsDateString()
	@IsOptional()
	startDate?: Date

	@ApiPropertyOptional({ example: new Date() })
	@IsDateString()
	@IsOptional()
	endDate?: Date

	@ApiPropertyOptional({ example: 'createdAt' })
	@IsString()
	@IsOptional()
	sort?: 'fullName' | 'createdAt'

	@ApiPropertyOptional({ example: 'desc' })
	@IsString()
	@IsOptional()
	sortType?: 'asc' | 'desc'

	@ApiPropertyOptional({ example: 'desc@gmail.com' })
	@IsEmail()
	@IsOptional()
	email?: string

	@ApiPropertyOptional({ example: 'john doe' })
	@IsString()
	@IsOptional()
	fullName?: string

	@ApiPropertyOptional({ example: 'user' })
	@IsEnum($Enums.UserTypeEnum)
	@IsOptional()
	type?: $Enums.UserTypeEnum
}

export class UserGetOneRequestDto implements UserGetOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class UserSignInRequestDto implements UserSignInRequest {
	@ApiProperty({ example: 'email@gmail.com' })
	@IsEmail()
	@IsNotEmpty()
	email: string

	@ApiProperty({ example: 'okk1123' })
	@IsString()
	@IsNotEmpty()
	password: string
}

export class UserCreateRequestDto implements UserCreateRequest {
	@ApiProperty({ example: 'desc@gmail.com' })
	@IsEmail()
	@IsNotEmpty()
	email: string

	@ApiProperty({ example: 'john doe' })
	@IsString()
	@IsOptional()
	fullName: string

	@ApiProperty({ example: 'not123' })
	@IsString()
	@IsOptional()
	password: string

	@ApiProperty({ example: 'user' })
	@IsEnum($Enums.UserTypeEnum)
	@IsOptional()
	type: $Enums.UserTypeEnum
}

export class UserChangeRequestDto implements UserUpdateRequest {
	@ApiProperty({ example: 'desc@gmail.com' })
	@IsEmail()
	@IsNotEmpty()
	email: string

	@ApiProperty({ example: 'john doe' })
	@IsString()
	@IsOptional()
	fullName: string

	@ApiProperty({ example: 'not123' })
	@IsString()
	@IsOptional()
	password: string

	@ApiProperty({ example: 'user' })
	@IsEnum($Enums.UserTypeEnum)
	@IsOptional()
	type: $Enums.UserTypeEnum
}

export class UserUpdateRequestDto implements UserUpdateRequest {
	@ApiPropertyOptional({ example: 'desc@gmail.com' })
	@IsEmail()
	@IsOptional()
	email?: string

	@ApiPropertyOptional({ example: 'john doe' })
	@IsString()
	@IsOptional()
	fullName?: string

	@ApiPropertyOptional({ example: 'johhdoe000' })
	@IsString()
	@IsOptional()
	password?: string

	@ApiPropertyOptional({ example: 'user' })
	@IsEnum($Enums.UserTypeEnum)
	@IsOptional()
	type?: $Enums.UserTypeEnum
}

export class UserDeleteRequestDto implements UserDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
