import { textCommandFilter } from '@/middleware/textCommandFilter'
import { SearchGroupNull } from '@/types/mcConfig.type'
import { McSever } from '@/types/server.type'
import { countStartServerTime, getGroupAndServer, handelmcResultInfo } from '@/utils/index'
import { getMcServerInfo } from '@/utils/request'
import { Message } from 'mirai-js'
import { Bot as BotType } from 'mirai-js/dist/node/index'
export default (bot: BotType) => {
  bot.on(
    'GroupMessage',
    new textCommandFilter('ping').done(async (data) => {
      const groupId = data.sender.group.id
      try {
        // 请求获取服务器信息
        const res = (await getMcServerInfo(data.text)) as McSever
        // 组装信息
        const mcInfoObj = new handelmcResultInfo(res)
        const { url } = await bot.uploadImage({ img: mcInfoObj.favicon })
        // 发送最终消息
        bot.sendMessage({
          group: groupId,
          message: new Message().addImageUrl(url).addText(mcInfoObj.text),
        })
      } catch (err) {
        console.log(err)
        if (err.code) {
          bot.sendMessage({
            group: groupId,
            message: new Message().addText(`${err.code}`),
          })
        }
      }
    }),
  )
}
