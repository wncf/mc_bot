// 测试用例的写法
// import { sum } from '../index'

import { getMcServerInfo } from '@/utils/request'
import path from 'path'
import { getMcConfig, powerFun, settingCommand } from './index'

describe('集成测试Get_mc', () => {
  it('测试获取服务器json信息', async () => {
    const groupId = 512772656
    const CumcServer = 'default'
    // const data = new settingCommand(512772656, '-add  name=e2e address=323232 alias=e2e')
    // const data = new settingCommand(512772656, '-update  default address=323232 alias=e2e')
    // const data = new settingCommand(512772656, '-remove  e2e ')

    // console.log(path.resolve(process.cwd(), '.env'))
    // console.log(path.resolve('<rootDir>/src/'))
    // console.log(path.resolve('mc_config.json'))

    // console.log(pathsa)

    expect(0).toEqual(0)
  })
})
