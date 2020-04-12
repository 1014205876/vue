/**

* api接口统一管理

*/

import { get, post} from './http'

//请求接口方法

export const apiAddress = p => get('studyUsers/getFlag', p);
