export interface McSever {
  favicon: string
  description: {
    text: string
    translate?: string
    extra?: string
  }
  players: { online: number; max: number; sample: any[] }
  version: { name: string }
}
