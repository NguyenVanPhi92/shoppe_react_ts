import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  // namespace and value
  en: { home: HOME_EN, product: PRODUCT_EN },
  vi: { home: HOME_VI, product: PRODUCT_VI }
} as const

export const defaultNS = 'product'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  // default langue
  lng: 'vi',
  ns: ['home', 'product'], // cac namespace dung i18n
  fallbackLng: 'vi',
  defaultNS, // set namespace default
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
