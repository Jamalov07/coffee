import { SetMetadata } from '@nestjs/common'
import { ROLES_KEY } from '../constants'

export const Roles = (...roles: ('admin' | 'user')[]) => SetMetadata(ROLES_KEY, roles)
