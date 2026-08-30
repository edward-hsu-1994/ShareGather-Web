import { useEffect, useState } from 'react'

const STORAGE_KEY = 'sharegather-language'
const TRADITIONAL_CHINESE = /zh-(hant|tw|hk|mo)/i
const ANY_CHINESE = /^zh/i

function detectBrowserLanguage() {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  if (languages.some((language) => TRADITIONAL_CHINESE.test(language))) return 'zh-Hant'
  if (languages.some((language) => ANY_CHINESE.test(language))) return 'zh-Hans'
  return 'en'
}

// Shared language state: starts from the saved preference (validated against
// the page's own catalog) or the browser language, stays in sync with
// document lang and localStorage across every entry page.
function useLanguage(catalog) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved && catalog[saved] ? saved : detectBrowserLanguage()
  })
  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem(STORAGE_KEY, language)
  }, [language])
  return [language, setLanguage]
}

function LanguagePicker({ value, onChange }) {
  return <label className="language-picker">
    <span className="sr-only">Language</span>
    <select value={value} onChange={onChange} aria-label="Language">
      <option value="zh-Hant">繁中</option>
      <option value="zh-Hans">简中</option>
      <option value="en">EN</option>
    </select>
  </label>
}

export { LanguagePicker, useLanguage }