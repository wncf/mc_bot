import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
const envVar = () => {
  return {
    BASE_URL: process.env.BASE_URL,
    VERIFYKEY: process.env.VERIFYKEY,
    QQ: process.env.QQ,
    MASTER_QQ: process.env.MASTER_QQ,
    TIMEOUT_TIME: process.env.TIMEOUT_TIME,
  }
}
export default envVar()
