import envVar from '@/config/config'
import { McSever } from '@/types/server.type'
import mcping from 'mcping-js'
const { TIMEOUT_TIME } = envVar

/**
 * @description 有关协议：https://wiki.vg/Protocol_version_numbers
 * @param address
 * @param protocolVersion
 * @returns Promise
 */
export const getMcServerInfo = async (address: string, protocolVersion?: number): Promise<McSever> => {
  const [ip, port] = address.split(':')
  const server = new mcping.MinecraftServer(ip, port)
  const protocol = protocolVersion || 760
  return new Promise((resolve, reject) => {
    server.ping(TIMEOUT_TIME, protocol, (err: any, res: McSever | PromiseLike<McSever>) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}
