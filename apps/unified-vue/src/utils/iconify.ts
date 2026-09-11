import type { IconifyJSON } from '@iconify/vue'
import { setCustomIconsLoader } from '@iconify/vue'

/**
 * 本地打包的 Iconify 图标集合。
 *
 * 新增集合：安装 `@iconify-json/<prefix>` 后在此登记加载函数。
 * 集合 JSON 只在该前缀的图标首次渲染时异步加载，不进入首屏产物。
 */
const collectionLoaders: Record<string, () => Promise<IconifyJSON>> = {
  lucide: () => import('@iconify-json/lucide/icons.json').then((collection) => collection.default),
}

const pendingCollections = new Map<string, Promise<IconifyJSON | null>>()

/**
 * 判断图标名是否为 Iconify 图标。
 * Iconify 图标名格式为 `<prefix>:<name>`，例如 `lucide:house`；本地 sprite 图标名不含冒号。
 */
export function isIconifyIconName(name: string): boolean {
  return name.includes(':')
}

/** 仅允许已登记集合的 prefix:icon 名称进入 Iconify 加载流程。 */
export function isRegisteredIconifyIconName(name: string): boolean {
  const parts = name.split(':')
  const [prefix, icon] = parts
  return parts.length === 2 && !!prefix && !!icon && Object.keys(collectionLoaders).includes(prefix)
}

/** 为本地集合注册 Iconify 自定义加载器，在应用入口调用一次。 */
export function registerIconifyCollections(): void {
  Object.entries(collectionLoaders).forEach(([prefix, loader]) => {
    setCustomIconsLoader(() => {
      let pending = pendingCollections.get(prefix)
      if (!pending) {
        pending = loader().catch(() => null)
        pendingCollections.set(prefix, pending)
      }
      return pending
    }, prefix)
  })
}
