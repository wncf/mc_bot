// 测试用例的写法
import { handelmcResultInfo } from './index'
import { getMcServerInfo } from './request'
describe('集成测试Get_mc', () => {
  it('测试获取服务器json信息', async () => {
    const groupId = 512772656
    const CumcServer = 'default'
    // const data = new settingCommand(512772656, '-add  name=e2e address=323232 alias=e2e')
    // const data = new settingCommand(512772656, '-update  default address=323232 alias=e2e')
    // const data = new settingCommand(512772656, '-remove  e2e ')
    const res = await getMcServerInfo('mc2b2t.com')
    const data = new handelmcResultInfo(res,'梦醒')
    console.log(data)
    // console.log(pathsa)
    expect(0).toEqual(0)
  })
})
