// import type { UseTableOptions, TableState } from './ReactTable'

/** Type interface of locale specific options.
 * @category Options */
export interface LocaleOptions {
  /**
   * Locale represented by BCP-47 Language tag. Used for number and date formatting.
   * @see [list of language tags](https://www.techonthenet.com/js/language_tags.php)
   * @see [MDN - Intl locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)
   * @default browser-locale
   * @example `en-GB`, `en-US`, `fi-FI`
   */
  locale?: string | string[]

  /**
   * Map of all static text used in the Table UI.
   * Provide a local/translated string value to a key
   * to override the original text in the table.
   */
  text?: Partial<LocaleText>
}

/**
 * Map of all static text used in the Table UI.
 * Provide a local/translated string value to a key
 * to override the original text in the table.
 */
export interface LocaleText extends Record<string, string> {
  // Common
  loading: string
  of: string
  // Status
  noRecords: string
  total: string
  records: string
  showing: string
  // Pagination
  page: string
  firstPage: string
  previousPage: string
  nextPage: string
  lastPage: string
  // Prefs
  tablePreferences: string
  save: string
  pageSize: string
  // Search
  filter: string
  search: string
  closeSearch: string
  hideColumnFilters: string
  showColumnFilters: string
  toggleColumnFilters: string
  // Actions
  toggleFullscreen: string
}

export default LocaleOptions
