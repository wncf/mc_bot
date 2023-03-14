// 测试用例的写法
// import { sum } from '../index'

import { getGroupAndServer } from '@/utils/index'

describe('集成测试Get_mc', () => {
  it('测试获取服务器json信息', () => {
    const groupId = 512772656
    const CumcServer = 'default'
    const result = getGroupAndServer(groupId, CumcServer)
    expect(result).toEqual({
      name: 'default',
      alias: '2023',
      address: 'h.minec.vip:25699',
      protocol: 340,
      startTime: '2022-06-15',
    })
  })
})
