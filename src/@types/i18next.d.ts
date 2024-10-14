import 'i18next'
import { defaultNS, resources } from 'src/i18n/i18n'
// extend module 'i18next' and add new type
declare module 'i18next' {
  // thêm các type này vào module i18next
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof resources['vi']
  }
}
