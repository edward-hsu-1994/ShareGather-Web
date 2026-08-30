import { createRoot } from 'react-dom/client'
import { LanguagePicker, useLanguage } from './i18n.jsx'
import './styles.css'

const screens = [
  ['screenshot-home.png', 'Home'],
  ['screenshot-save.png', 'Save item'],
  ['screenshot-share-to-app.png', 'Share to app'],
  ['screenshot-choose-category.png', 'Choose a category'],
  ['screenshot-category-items.png', 'Category items'],
]
const text = { 'zh-Hant': ['產品畫面', '看看 ShareGather 如何幫你收集、整理，再回看每一個值得保留的片刻。', '← 回到首頁'], 'zh-Hans': ['产品界面', '看看 ShareGather 如何帮你收集、整理，再回看每一个值得保留的片刻。', '← 返回首页'], en: ['Product screens', 'See how ShareGather helps you save, organize, and revisit every moment worth keeping.', '← Back home'] }

function Screenshots() {
  const [language, setLanguage] = useLanguage(text)
  const t = text[language]
  return <main className="screens-page"><header className="screens-header"><a className="brand" href="./"><img className="brand-mark" src="sharegather-icon.png" alt="" />ShareGather</a><div className="screens-controls"><a href="./">{t[2]}</a><LanguagePicker value={language} onChange={(event) => setLanguage(event.target.value)} /></div></header><section className="screens-intro"><p className="eyebrow">SHAREGATHER FOR IPHONE</p><h1>{t[0]}</h1><p>{t[1]}</p></section><section className="screens-grid">{screens.map(([src, name], index) => <figure className="screen-card" key={src}><div className="screen-device"><img src={src} alt={`ShareGather — ${name}`} /></div><figcaption><span>0{index + 1}</span>{name}</figcaption></figure>)}</section></main>
}
createRoot(document.getElementById('root')).render(<Screenshots />)