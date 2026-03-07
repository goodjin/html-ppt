import type { Asset, AssetType } from '@/types/asset'

const STORAGE_KEY = 'web-ppt-assets'

// File size limits (in bytes)
const SIZE_LIMITS: Record<AssetType, number> = {
  [AssetType.IMAGE]: 10 * 1024 * 1024, // 10MB
  [AssetType.FONT]: 5 * 1024 * 1024 // 5MB
}

// Allowed file types
const ALLOWED_TYPES: Record<AssetType, string[]> = {
  [AssetType.IMAGE]: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'],
  [AssetType.FONT]: ['font/woff', 'font/woff2', 'font/ttf', 'font/otf']
}

export class AssetService {
  private getAssets(): Asset[] {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  }

  private saveAssets(assets: Asset[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets))
  }

  private getAssetType(file: File): AssetType | null {
    if (ALLOWED_TYPES[AssetType.IMAGE].includes(file.type)) {
      return AssetType.IMAGE
    }
    if (ALLOWED_TYPES[AssetType.FONT].includes(file.type)) {
      return AssetType.FONT
    }
    return null
  }

  async upload(file: File): Promise<Asset> {
    const type = this.getAssetType(file)
    if (!type) {
      throw new Error('不支持的文件类型')
    }

    if (file.size > SIZE_LIMITS[type]) {
      throw new Error(`文件过大，最大${SIZE_LIMITS[type] / 1024 / 1024}MB`)
    }

    // Convert to base64 for storage
    const base64 = await this.fileToBase64(file)

    const asset: Asset = {
      id: crypto.randomUUID(),
      name: file.name,
      type,
      size: file.size,
      path: `assets/${type}/${file.name}`,
      url: base64,
      thumbnail: type === AssetType.IMAGE ? base64 : undefined,
      uploadedAt: new Date().toISOString()
    }

    const assets = this.getAssets()
    assets.push(asset)
    this.saveAssets(assets)

    return asset
  }

  async uploadMultiple(files: File[]): Promise<Asset[]> {
    const results: Asset[] = []
    for (const file of files) {
      try {
        const asset = await this.upload(file)
        results.push(asset)
      } catch {
        // Skip failed uploads
      }
    }
    return results
  }

  async getAssets(type?: AssetType): Promise<Asset[]> {
    const assets = this.getAssets()
    if (type) {
      return assets.filter(a => a.type === type)
    }
    return assets
  }

  async delete(id: string): Promise<void> {
    const assets = this.getAssets().filter(a => a.id !== id)
    this.saveAssets(assets)
  }

  getAssetUrl(id: string): string | null {
    const asset = this.getAssets().find(a => a.id === id)
    return asset?.url || null
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
}

export const assetService = new AssetService()
