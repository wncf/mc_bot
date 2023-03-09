import express from 'express'
const app = express()

const bootstrap = () => {
  app.get('/', (req, res) => {
    res.send({
      code: 0,
      message: 'ok',
    })
  })
  app.listen(8000, () => {
    console.log('ok')
  })
  console.log('hellow')
}

export { bootstrap }
