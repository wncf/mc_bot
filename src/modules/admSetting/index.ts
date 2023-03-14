import { textCommandFilter } from '@/middleware/textCommandFilter'
import { McSever } from '@/types/server.type'
import { getMcConfig, handelmcResultInfo, powerFun, settingCommand } from '@/utils/index'
import { getMcServerInfo } from '@/utils/request'
import { Message } from 'mirai-js'
import { Bot as BotType } from 'mirai-js/dist/node/index'
export default (bot: BotType) => {
  bot.on(
    'GroupMessage',
    new textCommandFilter('set').done(async (data) => {
      const groupId = data.sender.group.id
      const senderId = data.sender.id
      const res = powerFun('admin', senderId)
      if (!res) {
        bot.sendMessage({
          group: groupId,
          message: new Message().addText('有没有可能，你没有权限'),
        })
        return
      }
      try {
        new settingCommand(groupId, data.text)
        bot.sendMessage({
          group: groupId,
          message: new Message().addText('执行成功'),
        })
      } catch (err) {
        bot.sendMessage({
          group: groupId,
          message: new Message().addText(err.message),
        })
      }
    }),
  )
  bot.on(
    'GroupMessage',
    new textCommandFilter('config').done(async (data) => {
      const groupId = data.sender.group.id
      const senderId = data.sender.id
      const res = powerFun('admin', senderId)
      if (!res) {
        bot.sendMessage({
          group: groupId,
          message: new Message().addText('有没有可能，你没有权限'),
        })
        return
      }
      try {
        const data = getMcConfig()
        bot.sendMessage({
          group: groupId,
          message: new Message().addText(`${JSON.stringify(data.servers[groupId])}`),
        })
      } catch (err) {
        bot.sendMessage({
          group: groupId,
          message: new Message().addText(err.message),
        })
      }
    }),
  )
}
