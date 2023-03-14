import dayjs from 'dayjs'
import { Bot } from 'mirai-js'
import envVar from './config/config'
import { initModules } from './modules/index'
import { SearchGroupNull } from './types/mcConfig.type'
import { getGroupAndServer, getMcConfig, handelmcResultInfo } from './utils/index'
import { getMcServerInfo } from './utils/request'

const { BASE_URL, VERIFYKEY, QQ } = envVar
const bot = new Bot()
const botconfig = {
  baseUrl: BASE_URL,
  verifyKey: VERIFYKEY,
  qq: Number(QQ),
}

const bootstrap = async () => {
  // 判断mirai-console 服务是否登录
  const isLogin = await Bot.isBotLoggedIn({ ...botconfig })
  if (isLogin) {
    console.log('登录成功,正在启动ing')
  } else {
    console.log('登录失败')
    return
  }
  // 链接
  await bot.open({
    ...botconfig,
  })
  // 链接模块方法
  initModules(bot)
}

export { bootstrap }
