import { TsettingType, settingType } from './../types/setting.type'
import { powers } from '@/types/power.type'
import envVar from '@/config/config'
/**
 *
 * @param {*} all
 * @returns 类型String
 */
import { mcConfigServersType, mcConfigType, SearchGroupNull, ServersType } from '@/types/mcConfig.type'
import { McSever } from '@/types/server.type'
import fs from 'fs'
import path from 'path'
import { messages } from '@/message/setting.message'
import dayjs from 'dayjs'
export const Typeing = (item: any): string => {
  return Object.prototype.toString.call(item).slice(8, -1).toLowerCase()
}
export const getMcConfig = (): mcConfigType => {
  let data = fs.readFileSync(path.resolve('mc_config.json'), 'utf-8')
  return JSON.parse(data) as mcConfigType
}
export const writeMcConfig = (config: mcConfigType) => {
  fs.writeFileSync(path.resolve('mc_config.json'), JSON.stringify(config), 'utf-8')
}
export const getGroupAndServer = (GroupId: number, mcServerName: string): SearchGroupNull | ServersType => {
  let currentGroup = getMcConfig().servers[GroupId] || null
  if (!currentGroup) {
    return SearchGroupNull.GROUPNUll
  }
  let currentServer = currentGroup.find((item) => item.name === mcServerName)
  if (!currentServer) {
    return SearchGroupNull.GROUPSERVERNull
  }
  return currentServer
}
/**
 * arr1与arr2进行比较，
 * @param arr1
 * @param arr2
 * @returns arr1项目中arr2未有的值
 */
export const getInclude = (arr1: string[], arr2: string[]) => {
  let temp = []
  for (const item of arr2) {
    arr1.find((i) => i === item) ? '' : temp.push(item)
  }
  return temp
}
export class handelmcResultInfo {
  public text: string = ''
  public favicon: Buffer
  description: string = '描述:'
  players: string = '在线人员:'
  version: string = '当前版本:'
  constructor(data: McSever, name?: string) {
    if (name) {
      this.text += `${name}\n`
    }
    this.setFavicon(data.favicon)
    this.text += data?.description ? this.setDescription(data.description) : '这个狐务器没有描述\n'
    this.text += data?.version.name ? this.setVersion(data.version) : ''
    this.text += data?.players ? this.setPlayers(data.players) : ''
  }
  setDescription(description: McSever[`description`]) {
    return `${this.description} ${description.text || description.translate}\n`
  }
  setPlayers(players: McSever['players']) {
    return `${this.players}  ${players.online}/${players.max}\n${
      players.online && players.sample ? this.handelPlayer(players.sample) : ''
    }`
  }
  setVersion(version: McSever[`version`]) {
    return `${this.version} ${version.name}\n`
  }
  handelPlayer(sample: any[]) {
    let text = ''
    sample.forEach((item) => {
      text += `[${item.name}],`
    })
    return text
  }
  setFavicon(favicon: McSever['favicon']) {
    if (favicon) {
      const base64String = favicon.split(',')[1]
      this.favicon = Buffer.from(base64String, 'base64')
    } else {
      // 无，使用本地文件buffer对象
      this.favicon = fs.readFileSync(path.resolve('/public/mc_server_icon.png'))
    }
  }
}
export const countStartServerTime = (startTime: string): number => {
  const startday = (new Date().getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60 * 24)
  return parseInt(startday + '')
}
// 权限过滤函数
export const powerFun = (powers: powers, senderId: number) => {
  let res = false
  if (powers === 'admin' && +envVar.MASTER_QQ === senderId) {
    res = true
  } else {
    res = false
  }
  if (powers === 'all') {
    res = true
  }
  return res
}
/**
 *  通过指令修改对应mc配置文件
 */
export class settingCommand {
  fileObj: mcConfigType
  currentGroupObj: ServersType[]
  groupId: number
  constructor(groupId: number, data: string) {
    this.fileObj = getMcConfig()
    // 获取当前群组服务器数组
    this.groupId = groupId
    this.currentGroupObj = this.fileObj.servers[groupId]
    const [type, ...keyValue] = data
      .trim()
      .split(' ')
      .filter((item) => Boolean(item))
    type === '-add' ? this.add(keyValue) : ''
    type === '-update' ? this.update(keyValue) : ''
    type === '-remove' ? this.remove(keyValue) : ''
  }
  add(key: string[]) {
    const [name, ...reset] = key
    const valueObj = this.valueKeyMap(key)
    const keyWhite = ['name', 'alias', 'address']
    const errorKey = getInclude(
      valueObj.map((i) => i.key),
      keyWhite,
    )
    // 判断字段是否给全了
    if (errorKey.length >= 1) {
      throw new Error(messages.addKeyisMust(errorKey[0]))
    }
    // 如果第一次添加，则不进行判断
    if (this.currentGroupObj) {
      // 判断是否存在同名的name
      if (this.currentGroupObj.filter((item) => item.name === name.split('=')[1])[0]) {
        throw new Error(messages.addRepatServerName)
      }
    }
    const data = {}
    valueObj.forEach((i) => {
      data[i.key] = i.value
      if (i.key) {
      }
    })
    // 防止第一次添加push调用失败的情况
    if (!this.fileObj.servers[this.groupId]) {
      this.fileObj.servers[this.groupId] = [
        {
          ...(data as ServersType),
          protocol: 340,
          startTime: dayjs().format('YYYY-MM-DD'),
        },
      ]
    } else {
      this.fileObj.servers[this.groupId].push({
        ...(data as ServersType),
        protocol: 340,
        startTime: dayjs().format('YYYY-MM-DD'),
      })
    }
    //  同步
    this.setJsonFile()
  }
  update(key: string[]) {
    let currentDate: ServersType = null
    const [name, ...valueKey] = key
    // 格式化
    const valueObj = this.valueKeyMap(valueKey)
    // 查找对应修改对象
    currentDate = this.currentGroupObj?.filter((item) => item.name === name)[0]
    // 修改对应key value 并过滤不存在的key
    if (currentDate) {
      const currentDateKeys = Object.keys(currentDate)
      valueObj.forEach((item) => {
        if (currentDateKeys.includes(item.key)) {
          currentDate[item.key] = item.value
        }
      })
      this.setJsonFile()
    } else {
      throw new Error(messages.updateNullServerName)
    }
  }
  remove(key: string[]) {
    const [name] = key
    const removeIndex = this.currentGroupObj?.findIndex((item) => item.name === name)
    if (removeIndex && removeIndex !== -1) {
      this.currentGroupObj.splice(removeIndex, 1)
      this.setJsonFile()
    } else {
      throw new Error(messages.removeNullServerName)
    }
  }
  valueKeyMap(keyValues: string[]) {
    return keyValues.map((item) => {
      const [key, value] = item.split('=')
      return {
        key,
        value,
      }
    })
  }
  setJsonFile() {
    writeMcConfig(this.fileObj)
  }
}
