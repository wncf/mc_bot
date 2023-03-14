export type ServersType = {
  name: string
  alias: string
  address: string
  protocol: number
  startTime?: string
}

export type mcConfigServersType = {
  [key: string]: ServersType[]
}
export interface mcConfigType {
  main: {
    prefix: string
    bot_name: string
  }
  servers: mcConfigServersType
}

export enum SearchGroupNull {
  GROUPNUll = 'groupNull',
  GROUPSERVERNull = 'groupServerNull',
}
