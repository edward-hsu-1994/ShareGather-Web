import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const copy = {
  'zh-Hant': { navFeatures:'功能', navPrivacy:'隱私', heroEyebrow:'YOUR LITTLE GATHERING PLACE', heroTitle:<>收集當下，<br /><em>回看以後。</em></>, heroText:'把一閃而過的網頁與文字，留在一個安靜、只屬於你的地方。', seeHow:'看看它如何運作', explore:'在 GitHub 探索', preview:'介面預覽', introEyebrow:'MADE FOR THE THINGS WORTH KEEPING', introTitle:<>不是又一個待辦清單。<br />是你想回來看的地方。</>, introText:'有些東西不必立刻處理，只要先好好留著。ShareGather 讓收集這件事變得簡單，讓你在對的時候重新遇見它。', ritualEyebrow:'A QUIET RITUAL', ritualTitle:<>留一點空白，<br /><em>給好奇心。</em></>, ritualText:'不追求讀完所有東西。只為那些讓你停下來的片刻，留下一個可靠的入口。', privacyLink:'認識我們的隱私原則', privacyEyebrow:'PRIVATE BY DESIGN', privacyTitle:<>你的收藏，<br />只在你的裝置上。</>, privacyFull:'閱讀完整隱私權政策', closingEyebrow:'KEEP WHAT CLICKS', closingTitle:<>給每一次<br /><em>心動一個位置。</em></>, github:'前往 GitHub', footer:'本機優先，為 iPhone 而生。', features:[['從分享選單，一鍵收下','網頁與文字，都能直接從 iPhone 分享選單送進 ShareGather。'],['替每個靈感找到位置','建立分類、拖曳排序、釘選重點。稍後回來，一樣找得到。'],['保留內容，也補足脈絡','網址會保留原始連結，並在可用時帶回標題、來源與預覽縮圖。'],['資料始終握在手上','沒有帳號、沒有追蹤、沒有 ShareGather 雲端。也可隨時匯出完整備份。']], privacy:[['無帳號','不必交出電子信箱，也不需建立新身份。'],['無追蹤','沒有分析、廣告或資料經紀服務。'],['本機優先','內容儲存在你 iPhone 的本機空間，需要時再自行備份。']] },
  'zh-Hans': { navFeatures:'功能', navPrivacy:'隐私', heroEyebrow:'YOUR LITTLE GATHERING PLACE', heroTitle:<>收集当下，<br /><em>回看以后。</em></>, heroText:'把一闪而过的网页与文字，留在一个安静、只属于你的地方。', seeHow:'看看它如何运作', explore:'在 GitHub 探索', preview:'界面预览', introEyebrow:'MADE FOR THE THINGS WORTH KEEPING', introTitle:<>不是又一个待办清单。<br />是你想回来看看的地方。</>, introText:'有些东西不必立刻处理，只要先好好留着。ShareGather 让收集这件事变得简单，让你在对的时候重新遇见它。', ritualEyebrow:'A QUIET RITUAL', ritualTitle:<>留一点空白，<br /><em>给好奇心。</em></>, ritualText:'不追求读完所有东西。只为那些让你停下来的片刻，留一个可靠的入口。', privacyLink:'认识我们的隐私原则', privacyEyebrow:'PRIVATE BY DESIGN', privacyTitle:<>你的收藏，<br />只在你的设备上。</>, privacyFull:'阅读完整隐私政策', closingEyebrow:'KEEP WHAT CLICKS', closingTitle:<>给每一次<br /><em>心动一个位置。</em></>, github:'前往 GitHub', footer:'本机优先，为 iPhone 而生。', features:[['从分享菜单，一键收下','网页和文字，都能直接从 iPhone 分享菜单送进 ShareGather。'],['替每个灵感找到位置','建立分类、拖动排序、置顶重点。稍后回来，一样找得到。'],['保留内容，也补足脉络','网址会保留原始链接，并在可用时带回标题、来源与预览缩略图。'],['数据始终握在手上','没有账号、没有追踪、没有 ShareGather 云端。也可随时导出完整备份。']], privacy:[['无账号','不必交出电子邮箱，也不需建立新身份。'],['无追踪','没有分析、广告或数据经纪服务。'],['本机优先','内容储存在你 iPhone 的本机空间，需要时再自行备份。']] },
  en: { navFeatures:'Features', navPrivacy:'Privacy', heroEyebrow:'YOUR LITTLE GATHERING PLACE', heroTitle:<>Keep it now.<br /><em>Find it later.</em></>, heroText:'A quiet place for the links and thoughts that catch your attention.', seeHow:'See how it works', explore:'Explore on GitHub', preview:'Interface preview', introEyebrow:'MADE FOR THE THINGS WORTH KEEPING', introTitle:<>Not another to-do list.<br />A place to return to.</>, introText:'Some things do not need action right away. They just deserve to be kept. ShareGather makes collecting simple, so you can meet them again at the right time.', ritualEyebrow:'A QUIET RITUAL', ritualTitle:<>Make a little room<br /><em>for curiosity.</em></>, ritualText:'There is no need to finish everything. Just keep a dependable door open for the moments that make you pause.', privacyLink:'Our privacy principles', privacyEyebrow:'PRIVATE BY DESIGN', privacyTitle:<>Your collection<br />stays on your device.</>, privacyFull:'Read the full privacy policy', closingEyebrow:'KEEP WHAT CLICKS', closingTitle:<>A place for every<br /><em>small spark.</em></>, github:'Visit GitHub', footer:'Local-first, made for iPhone.', features:[['Save in one tap','Send links and text to ShareGather directly from the iPhone Share Sheet.'],['Give each spark a place','Create categories, reorder them, and pin what matters. It will still be there later.'],['Keep the context, too','Original links are preserved, with titles, sources, and thumbnails whenever available.'],['Your data stays yours','No account, tracking, or ShareGather cloud. Export a complete backup whenever you need it.']], privacy:[['No account','No email address or new identity required.'],['No tracking','No analytics, advertising, or data-broker services.'],['Local-first','Your content lives in your iPhone’s local storage, ready for you to back up on your terms.']] },
}

function preferredLanguage() {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  if (languages.some((language) => /zh-(hant|tw|hk|mo)/i.test(language))) return 'zh-Hant'
  if (languages.some((language) => /^zh/i.test(language))) return 'zh-Hans'
  return 'en'
}

function initialLanguage() {
  const saved = localStorage.getItem('sharegather-language')
  return saved && copy[saved] ? saved : preferredLanguage()
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState(initialLanguage)
  const t = copy[language]
  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem('sharegather-language', language)
  }, [language])
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return <>
    <header className="nav">
      <button className="brand" onClick={() => scrollTo('top')} aria-label="回到頂端"><img className="brand-mark" src="sharegather-icon.png" alt="" />ShareGather</button>
      <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="主要導覽">
        <button onClick={() => scrollTo('features')}>{t.navFeatures}</button>
        <button onClick={() => scrollTo('privacy')}>{t.navPrivacy}</button>
        <a href="screenshots.html">Screenshots</a>
        <a href="https://github.com/edward-hsu-1994/ShareGather/issues" target="_blank" rel="noreferrer">{language === 'zh-Hant' ? '支援' : language === 'zh-Hans' ? '支持' : 'Support'} <span>↗</span></a>
        <a href="https://github.com/edward-hsu-1994/ShareGather" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
        <label className="language-picker">
          <span className="sr-only">Language</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Language">
            <option value="zh-Hant">繁中</option>
            <option value="zh-Hans">简中</option>
            <option value="en">EN</option>
          </select>
        </label>
      </nav>
      <button className="menu" aria-label="開啟選單" onClick={() => setMenuOpen(!menuOpen)}><i></i><i></i></button>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-description">{t.heroText}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#features">{t.seeHow} <span>↓</span></a>
            <a className="text-link" href="https://github.com/edward-hsu-1994/ShareGather" target="_blank" rel="noreferrer">{t.explore} <span>↗</span></a>
          </div>
        </div>
        <div className="hero-art" aria-label="ShareGather 介面示意圖">
          <div className="sun"></div><div className="dot dot-a"></div><div className="dot dot-b"></div>
          <div className="phone phone-main">
            <img className="screen-screenshot" src="screenshot-home.png" alt="ShareGather 首頁，今天想保存什麼？" />
          </div>
          <div className="phone phone-share"><img className="screen-screenshot" src="screenshot-save.png" alt="Save to ShareGather 分享畫面" /></div>
          <span className="art-note">{t.preview}<br /><b>coming soon</b></span>
        </div>
      </section>

      <section className="intro" id="features">
        <p className="eyebrow">{t.introEyebrow}</p>
        <h2>{t.introTitle}</h2>
        <p>{t.introText}</p>
      </section>

      <section className="feature-grid">
        {t.features.map(([title, description], index) => <article className="feature" key={title}>
          <div className={`feature-icon icon-${index}`}>{['↗', '⌁', '⌕', '⇩'][index]}</div><span className="feature-number">0{index + 1}</span>
          <h3>{title}</h3><p>{description}</p>
        </article>)}
      </section>

      <section className="ritual">
        <div className="ritual-visual">
          <div className="circle-text">MAKE SPACE FOR WHAT MATTERS · </div>
          <div className="note n1">那間想去的書店</div><div className="note n2">一段喜歡的話</div><div className="note n3">週末再讀</div>
          <div className="ritual-phone"><img className="screen-screenshot" src="screenshot-category-items.png" alt="ShareGather 收藏分類慢慢看" /></div>
        </div>
        <div className="ritual-copy"><p className="eyebrow">{t.ritualEyebrow}</p><h2>{t.ritualTitle}</h2><p>{t.ritualText}</p><a className="text-link" href="#privacy">{t.privacyLink} <span>↓</span></a></div>
      </section>

      <section className="privacy" id="privacy"><p className="eyebrow">{t.privacyEyebrow}</p><h2>{t.privacyTitle}</h2><div className="privacy-points">{t.privacy.map(([title, description]) => <p key={title}><b>{title}</b>{description}</p>)}</div><a className="button button-light" href="privacy.html">{t.privacyFull} <span>→</span></a></section>

      <section className="closing"><p className="eyebrow">{t.closingEyebrow}</p><h2>{t.closingTitle}</h2><a className="button button-dark" href="https://github.com/edward-hsu-1994/ShareGather" target="_blank" rel="noreferrer">{t.github} <span>↗</span></a></section>
    </main>
    <footer><a className="brand" href="#top"><img className="brand-mark" src="sharegather-icon.png" alt="" />ShareGather</a><p>{t.footer}</p><p>© 2026 ShareGather</p></footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
