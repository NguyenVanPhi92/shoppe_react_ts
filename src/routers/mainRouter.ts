import { routerLogin } from '@view/Auth/Login/router'
import { routerViewProfile } from '@view/Auth/Profiles/router'
import { routerHome } from '@view/Home/router'
import { routerPageError } from '@view/PageError/router'

import { IRouter } from './interface'

export const privatePage: IRouter[] = [routerHome, routerViewProfile, routerPageError]

export const publicPage: IRouter[] = [routerLogin, routerPageError]
