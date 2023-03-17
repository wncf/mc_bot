import { textCommandFilter } from '@/middleware/textCommandFilter'
import { SearchGroupNull } from '@/types/mcConfig.type'
import { McSever } from '@/types/server.type'
import { countStartServerTime, getGroupAndServer, handelmcResultInfo } from '@/utils/index'
import { getMcServerInfo } from '@/utils/request'
import { Message } from 'mirai-js'
import { Bot as BotType } from 'mirai-js/dist/node/index'
import path from 'path'
import fs from 'fs'
export default (bot: BotType) => {
  bot.on(
    'GroupMessage',
    new textCommandFilter('mc').done(async (data) => {
      const groupId = data.sender.group.id
      const CumcServer = data.text || 'default'
      const result = getGroupAndServer(groupId, CumcServer)
      if (result === SearchGroupNull.GROUPNUll) {
        bot.sendMessage({
          group: groupId,
          message: new Message().addText(`当前群聊${groupId}未配置任何信息`),
        })
        return
      } else if (result === SearchGroupNull.GROUPSERVERNull) {
        bot.sendMessage({
          group: groupId,
          message: new Message().addText(`当前群聊${groupId}下没有${CumcServer}服务器`),
        })
        return
      }
      const { address, startTime, alias, protocol } = result
      // 请求获取服务器信息
      try {
        const res = (await getMcServerInfo(address, protocol)) as McSever
        // 处理信息
        const mcInfoObj = new handelmcResultInfo(res, alias)
        const { url } = await bot.uploadImage({ img: mcInfoObj.favicon })
        bot.sendMessage({
          group: groupId,
          message: new Message()
            .addImageUrl(url)
            .addText(`${mcInfoObj.text}\n现在是开服的${countStartServerTime(startTime)}天`),
        })
      } catch (err) {
        console.log(err);
        if (err.stack.search(/timeout/g)) {
          bot.sendMessage({
            group: groupId,
            message: new Message().addText(`网络请求超时`),
          })
        } else if (err.code) {
          bot.sendMessage({
            group: groupId,
            message: new Message().addText(`${err.code}`),
          })
        }
      }
    }),
  )
}
