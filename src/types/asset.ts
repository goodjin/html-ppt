export enum AssetType {
  IMAGE = 'image',
  FONT = 'font'
}

export interface Asset {
  id: string
  name: string
  type: AssetType
  size: number
  path: string
  url: string
  thumbnail?: string
  uploadedAt: string
}
