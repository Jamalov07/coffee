import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { JwtConfig } from '../../configs'
import { SignInTokenDefinition } from '../../interfaces'

@Injectable()
export class JWTService {
	private readonly jwtService: JwtService
	constructor(jwtService: JwtService) {
		this.jwtService = jwtService
	}

	async getTokens(payload: { id: string }): Promise<SignInTokenDefinition> {
		return {
			accessToken: await this.getAccessToken(payload),
			refreshToken: await this.getRefreshToken(payload),
		}
	}

	async getAccessToken(payload: { id: string }): Promise<string> {
		const accessToken = await this.jwtService.signAsync(payload, {
			secret: JwtConfig.accessToken.key,
			expiresIn: JwtConfig.accessToken.time,
		})

		return accessToken
	}

	async getRefreshToken(payload: { id: string }): Promise<string> {
		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: JwtConfig.refreshToken.key,
			expiresIn: JwtConfig.refreshToken.time,
		})
		return refreshToken
	}

	async verifyAccessToken(token: string): Promise<object> {
		const user = await this.jwtService.verifyAsync(token, {
			secret: JwtConfig.accessToken.key,
		})

		return { id: user?.id }
	}
	async verifyRefreshToken(token: string): Promise<object> {
		const user = await this.jwtService.verifyAsync(token, {
			secret: JwtConfig.refreshToken.key,
		})

		return { id: user?.id }
	}
}
