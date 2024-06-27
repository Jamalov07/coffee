export declare interface AppConfigOptions {
	host: string
	port: number
}

export declare interface DatabaseConfigOptions {
	url?: string
}

export declare interface JwtConfigOptions {
	accessToken: {
		key: string
		time: string
	}
	refreshToken: {
		key: string
		time: string
	}
}

export declare interface SignInTokenDefinition {
	accessToken: string
	refreshToken: string
}
