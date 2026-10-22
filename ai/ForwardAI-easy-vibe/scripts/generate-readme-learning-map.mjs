import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Generate both diagrams and their translated README entry points together.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const locales = JSON.parse(
  fs.readFileSync(
    path.join(root, 'scripts/readme-learning-map.locales.json'),
    'utf8'
  )
)
const check = process.argv.includes('--check')
const colors = [
  ['#1674DB', '#EDF5FF'],
  ['#6755C9', '#F1EEFF'],
  ['#088878', '#EAF8F4'],
  ['#B66B1B', '#FFF4E6']
]
const routes = [
  'stage-1/learning-map/',
  'stage-1/ai-capabilities-through-games/',
  'stage-1/finding-great-idea/',
  'stage-2/',
  'stage-3/'
]
const projects = [
  'stage-1/ai-capabilities-through-games/',
  'stage-1/complete-project-practice/',
  'stage-2/assignments/copywriting-platform-supabase/',
  'stage-3/core-skills/workflow/',
  'appendix/'
]
const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
const font = (locale) =>
  ({
    'zh-cn':
      'Hiragino Sans GB, Noto Sans CJK SC, PingFang SC, Microsoft YaHei, sans-serif',
    'zh-tw': 'PingFang TC, Noto Sans CJK TC, Microsoft JhengHei, sans-serif',
    'ja-jp':
      'Hiragino Kaku Gothic ProN, Yu Gothic, Noto Sans CJK JP, sans-serif',
    'ko-kr': 'Apple SD Gothic Neo, Malgun Gothic, Noto Sans CJK KR, sans-serif'
  })[locale] || 'Arial, Helvetica, sans-serif'

class Diagram {
  constructor(locale, height, title, description) {
    this.copy = locales[locale]
    this.rtl = this.copy.dir === 'rtl'
    this.parts = [
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" role="img" aria-labelledby="title desc" lang="${locale}">`,
      `<title id="title">${escape(title)}</title><desc id="desc">${escape(description)}</desc>`,
      `<g font-family="${font(locale)}"${this.rtl ? ' transform="translate(1200 0) scale(-1 1)"' : ''}>`
    ]
    this.rect(1, 1, 1198, height - 2, '#FFFFFF', 22, '#DCE8F6')
  }
  rect(x, y, width, height, fill, radius = 12, stroke) {
    this.parts.push(
      `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}"${stroke ? ` stroke="${stroke}"` : ''}/>`
    )
  }
  text(
    x,
    y,
    value,
    size = 20,
    color = '#425978',
    weight = 400,
    anchor = 'start',
    maxWidth = 1120
  ) {
    const fitted = this.copy.font_sizes?.[value] ?? size
    const brand = value === 'easy-vibe'
    const actualAnchor = this.rtl && brand ? 'end' : anchor
    const direction = this.rtl
      ? ` direction="${brand ? 'ltr' : 'rtl'}" style="unicode-bidi:plaintext" transform="translate(${2 * x} 0) scale(-1 1)"`
      : ''
    this.parts.push(
      `<text x="${x}" y="${y}" font-size="${fitted}" fill="${color}" font-weight="${weight}" text-anchor="${actualAnchor}" data-fit-width="${maxWidth}" data-fit-base-size="${size}"${direction}>${escape(value)}</text>`
    )
  }
  line(d, color = '#9AB3D1', width = 2) {
    this.parts.push(
      `<path d="${d}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`
    )
  }
  output() {
    return this.parts.concat('</g></svg>', '').join('\n')
  }
}

const generated = new Map()
for (const [locale, c] of Object.entries(locales)) {
  const largeText = /^(zh|ja|ko)-/.test(locale) || c.dir === 'rtl'
  if (
    c.rows.length !== 4 ||
    c.steps.length !== 4 ||
    c.nav.length !== 5 ||
    c.subnav.length !== 5
  )
    throw new Error(`Incomplete locale: ${locale}`)
  const pick = new Diagram(
    locale,
    890,
    c.pick_title,
    c.pick_sub +
      ' ' +
      c.rows.map((r) => [r[0], r[2], r[5][0]].join(' / ')).join('; ')
  )
  pick.text(40, 43, 'easy-vibe', 22, '#0982E6', 700)
  pick.text(1160, 43, c.map_label, 15, '#6985A6', 600, 'end', 600)
  pick.text(40, 103, c.pick_title, 38, '#132B49', 700)
  pick.text(40, 144, c.pick_sub, 22)
  pick.rect(40, 176, 1120, 46, '#F2F7FD', 10)
  for (const [i, x] of [62, 370, 905].entries())
    pick.text(
      x,
      206,
      c.heads[i],
      20,
      '#527295',
      600,
      'start',
      [288, 480, 235][i]
    )
  c.rows.forEach((r, i) => {
    const y = 238 + 142 * i
    const [color, soft] = colors[i]
    pick.rect(40, y, 1120, 126, '#FFFFFF', 12, '#DFEAF7')
    pick.rect(40, y, 6, 126, color, 3)
    pick.text(
      64,
      y + 40,
      r[0],
      largeText ? 25 : 22,
      '#173654',
      650,
      'start',
      286
    )
    pick.text(
      64,
      y + 73,
      r[1],
      largeText ? 19 : 17,
      '#425978',
      400,
      'start',
      286
    )
    pick.text(370, y + 27, r[2], largeText ? 15 : 12, color, 600, 'start', 480)
    let x = 370
    r[3].forEach((label, j) => {
      const width = r[3].length === 2 ? 148 : 138
      pick.rect(x, y + 40, width, 32, soft, 7)
      pick.text(
        x + width / 2,
        y + 62,
        label,
        largeText ? 18 : 16,
        color,
        550,
        'middle',
        width - 16
      )
      if (j < r[3].length - 1)
        pick.line(`M${x + width + 6} ${y + 56}h13m-4-4 4 4-4 4`, color, 1.8)
      x += width + 30
    })
    pick.text(
      370,
      y + 103,
      r[4],
      largeText ? 19 : 17,
      '#425978',
      400,
      'start',
      480
    )
    pick.line(`M875 ${y + 25}v76`, '#E0EAF5', 1)
    pick.text(
      905,
      y + 50,
      r[5][0],
      largeText ? 22 : 20,
      '#173654',
      600,
      'start',
      235
    )
    pick.text(
      905,
      y + 84,
      r[5][1],
      largeText ? 18 : 15,
      '#425978',
      400,
      'start',
      235
    )
  })
  pick.text(40, 854, c.pick_footer, largeText ? 19 : 17, '#607B99')
  generated.set(
    `assets/readme-panels/05-choose-your-path-${locale}.svg`,
    pick.output()
  )

  const grow = new Diagram(
    locale,
    950,
    c.grow_title,
    c.grow_sub +
      ' ' +
      c.steps.map((r) => [r[0], r[1], r[4]].join(' / ')).join('; ')
  )
  grow.text(40, 43, 'easy-vibe', 22, '#0982E6', 700)
  grow.text(1160, 43, c.growth_label, 15, '#6985A6', 600, 'end', 600)
  grow.text(40, 102, c.grow_title, largeText ? 36 : 38, '#132B49', 700)
  grow.text(40, 143, c.grow_sub, 21)
  grow.line('M40 778H315V718H605V658H895V598H1160', '#B8CEE9', 4)
  c.steps.forEach((r, i) => {
    const x = 40 + i * 290,
      y = 365 - i * 60
    const [color, soft] = colors[i]
    grow.rect(x, y, 250, 385, '#FFFFFF', 15, '#D9E7F7')
    grow.rect(x, y, 250, 7, color, 3)
    grow.rect(x + 18, y + 22, 42, 37, soft, 9)
    grow.text(x + 39, y + 48, `0${i}`, 23, color, 650, 'middle', 36)
    grow.text(
      x + 18,
      y + 88,
      r[0],
      largeText ? 17 : 13,
      color,
      600,
      'start',
      214
    )
    grow.text(
      x + 18,
      y + 128,
      r[1],
      largeText ? 25 : 21,
      '#173654',
      700,
      'start',
      214
    )
    grow.text(
      x + 18,
      y + 164,
      r[2],
      largeText ? 15 : i === 3 ? 11 : 12,
      '#425978',
      400,
      'start',
      214
    )
    grow.text(
      x + 18,
      y + 194,
      r[3],
      largeText ? 15 : 12,
      '#425978',
      400,
      'start',
      214
    )
    grow.line(`M${x + 18} ${y + 216}h214`, '#E1EAF5', 1)
    grow.text(
      x + 18,
      y + 244,
      c.proof,
      largeText ? 16 : 12,
      '#6C829C',
      600,
      'start',
      214
    )
    grow.text(
      x + 18,
      y + 278,
      r[4],
      largeText ? 21 : 18,
      color,
      600,
      'start',
      214
    )
    r[5].forEach((label, j) => {
      const yy = y + 315 + j * 28
      grow.line(`M${x + 20} ${yy - 5}l4 4 7-9`, color, 1.8)
      grow.text(
        x + 39,
        yy,
        label,
        largeText ? 16 : 12,
        '#425978',
        400,
        'start',
        193
      )
    })
    if (i < 3)
      grow.line(`M${x + 261} ${y + 97}l18-26m-8 2 8-2 1 8`, '#7697BE', 2)
  })
  grow.rect(355, 725, 805, 85, '#F2F7FD', 12)
  grow.text(
    378,
    759,
    c.practice,
    largeText ? 24 : 22,
    '#24486D',
    600,
    'start',
    760
  )
  grow.text(
    378,
    792,
    c.practice_sub,
    largeText ? 18 : 16,
    '#425978',
    400,
    'start',
    760
  )
  grow.rect(40, 848, 1120, 62, '#F6F9FD', 12)
  c.bottom.forEach((line, i) =>
    grow.text(
      62 + 366 * i,
      887,
      line,
      largeText ? 20 : 17,
      '#527295',
      500,
      'start',
      342
    )
  )
  generated.set(
    `assets/readme-panels/06-learning-progression-${locale}.svg`,
    grow.output()
  )
}

const readmes = [
  ['README.md', 'en'],
  ...fs
    .readdirSync(path.join(root, 'docs-readme'))
    .filter((name) =>
      fs.existsSync(path.join(root, 'docs-readme', name, 'README.md'))
    )
    .map((name) => [
      `docs-readme/${name}/README.md`,
      name === 'en-US' ? 'en' : name.toLowerCase()
    ])
]
for (const [file, locale] of readmes) {
  const c = locales[locale]
  if (!c) throw new Error(`Missing translations for ${file}`)
  const prefix = file === 'README.md' ? 'assets/' : '../../assets/'
  const nav = (labels, paths) =>
    `<p align="center"${c.dir === 'rtl' ? ' dir="rtl"' : ''}>\n  ${labels.map((label, i) => `<a href="https://datawhalechina.github.io/easy-vibe/${locale}/${paths[i]}">${escape(label)}</a>`).join(' ·\n  ')}\n</p>`
  const block = `<a id="learning-start"></a>\n<p align="center">\n  <img src="${prefix}readme-panels/05-choose-your-path-${locale}.svg" alt="${escape(c.pick_title + ' ' + c.pick_sub)}" width="100%">\n</p>\n\n${nav(c.nav, routes)}\n\n<a id="learning-progression"></a>\n<p align="center">\n  <img src="${prefix}readme-panels/06-learning-progression-${locale}.svg" alt="${escape(c.grow_title + ' ' + c.grow_sub)}" width="100%">\n</p>\n\n${nav(c.subnav, projects)}`
  let markdown = fs.readFileSync(path.join(root, file), 'utf8')
  if (markdown.includes('<a id="learning-start"></a>')) {
    markdown = markdown.replace(
      /<a id="learning-start"><\/a>[\s\S]*?(?=\n\n<table align="center">)/,
      block
    )
  } else {
    const old =
      /<p align="center">\s*<a href="[^"]+">\s*<img src="[^"]*readme-panels\/03-interactive-learning\.png"[^>]*>\s*<\/a>\s*<\/p>/
    if (!old.test(markdown))
      throw new Error(`Cannot find learning panel in ${file}`)
    markdown = markdown.replace(old, block)
  }
  markdown = markdown.replace(
    /<div align="center">\s*<img src="[^"]*readme-panels\/01-learning-path\.svg"[^>]*>\s*<\/div>/,
    '<p><a href="#learning-progression">PLACEHOLDER_BACK_LINK</a></p>'
  )
  markdown = markdown.replace(
    /<p(?: dir="rtl")?><a href="#learning-progression">[^<]*<\/a><\/p>/,
    `<p${c.dir === 'rtl' ? ' dir="rtl"' : ''}><a href="#learning-progression">${escape(c.back)}</a></p>`
  )
  if (markdown.includes('PLACEHOLDER_BACK_LINK'))
    throw new Error(`Untranslated back link in ${file}`)
  generated.set(file, markdown)
  const panel = markdown.slice(
    markdown.indexOf('<a id="learning-start"'),
    markdown.indexOf('<table align="center">')
  )
  if (
    (panel.match(/<img /g) || []).length !== 2 ||
    (panel.match(/<a href=/g) || []).length !== 10
  )
    throw new Error(`Incomplete learning navigation in ${file}`)
  for (const route of [...routes, ...projects]) {
    if (!fs.existsSync(path.join(root, 'docs', locale, route, 'index.md')))
      throw new Error(`Missing course page: ${locale}/${route}`)
    if (!panel.includes(`/${locale}/${route}`))
      throw new Error(`Incorrect course locale: ${file}`)
  }
}
for (const [file, value] of generated) {
  const target = path.join(root, file)
  if (check) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== value)
      throw new Error(
        `Stale learning diagrams or navigation: ${file}. Run node scripts/generate-readme-learning-map.mjs`
      )
  } else fs.writeFileSync(target, value)
}
console.log(
  `${check ? 'Verified' : 'Updated'} ${Object.keys(locales).length * 2} diagrams and ${readmes.length} READMEs with ${readmes.length * 10} localized tutorial links.`
)
