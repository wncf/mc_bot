import get_mc from '@/modules/get_mc/index'
import ping from '@/modules/ping/index'
import admSetting from './admSetting/index'
import { Bot as Ibot } from 'mirai-js/dist/node/index'

export const initModules = (bot: Ibot) => {
  get_mc(bot)
  ping(bot)
  admSetting(bot)
  console.log('链接成功')
}
