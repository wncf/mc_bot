import envVar from '@/config/config'
import { powers } from '@/types/power.type'
import { Middleware } from 'mirai-js'
import { getMcConfig, Typeing } from '../utils/index'
const mcConfig = getMcConfig()
class textCommandFilter extends Middleware {
  constructor(Command: string) {
    super()
    this.textProcessor().use(async (data, next) => {
      try {
        if (data && data.text) {
          if (Typeing(data.text) === 'string' && data.text.indexOf(mcConfig.main.prefix) === 0) {
            const comdprefix = `${mcConfig.main.prefix}${Command}`
            // 如果不以#开头 false
            if (data.text.search(mcConfig.main.prefix) !== 0) return
            // 如果 "fdsa#mcdsfa" =>false "#mcsdfa" =>true
            if (data.text.match(comdprefix)?.index !== 0) return
            // #mcfdas => fdas
            const text: string = data.text.replace(comdprefix, '').replace(/^\s+|\s+$/g, '')
            data.text = text
            next()
          }
        }
      } catch (err) {
        console.log('指令异常', err)
      }
    })
  }
}
export { textCommandFilter }
