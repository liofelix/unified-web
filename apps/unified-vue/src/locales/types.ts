import type enUS from './messages/en-US'

export type AppLocale = 'zh-CN' | 'en-US'
type AppLocaleMessage = typeof enUS

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends AppLocaleMessage {}
}
