import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  productManagerSidebarEn,
  stage2SidebarEn,
  stage3SidebarEn
} from '../docs/.vitepress/sidebars/data.mjs'

// Keep the diagram tied to actual course chapters rather than software versions.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const nodes = [
  ['Find a need', 'Research · Validate', 'stage-1/finding-great-idea', 'search'],
  ['AI IDE', 'Cursor · Claude', 'stage-1/introduction-to-ai-ide', 'code'],
  ['AI prototype', 'Text · Image · Video', 'stage-1/integrating-ai-capabilities', 'spark'],
  ['Design & code', 'Figma · GitHub', 'stage-2/frontend/design-to-code', 'layout'],
  ['Data & AI', 'Supabase · Dify', 'stage-2/backend/database-supabase', 'database'],
  ['Ship & charge', 'Zeabur · Stripe', 'stage-2/backend/stripe-payment', 'cloud'],
  ['Agent tools', 'Claude Code · MCP', 'stage-3/core-skills/mcp', 'plug'],
  ['Workflows', 'Skills · Agent Teams', 'stage-3/core-skills/agent-teams', 'workflow'],
  ['Cross-platform', 'Web · Mobile · Desktop', 'stage-3/cross-platform/choose-platform', 'devices']
]

const sources = [
  ...nodes.map((node) => node[2]),
  'stage-1/learning-map',
  'stage-1/complete-project-practice',
  'stage-2/frontend/figma-mastergo',
  'stage-2/backend/git-workflow',
  'stage-2/backend/zeabur-deployment',
  'stage-2/ai-capabilities/dify-knowledge-base',
  'stage-3/core-skills/skills',
  'stage-3/core-skills/github-iterative-development'
]
for (const chapter of sources) {
  if (!fs.existsSync(path.join(root, 'docs/zh-cn', chapter, 'index.md'))) {
    throw new Error(`Learning map references a missing chapter: ${chapter}`)
  }
}

const icons = {
  search: '<circle cx="21" cy="21" r="12"/><path d="m30 30 12 12M16 21h10M21 16v10"/>',
  code: '<rect x="5" y="8" width="42" height="34" rx="6"/><path d="m20 20-6 6 6 6m12-12 6 6-6 6m-4-14-4 28"/>',
  spark: '<path d="m26 4 6 16 16 6-16 6-6 16-6-16-16-6 16-6Z"/>',
  layout: '<rect x="5" y="7" width="42" height="38" rx="6"/><path d="M5 18h42M21 18v27M11 12h1m5 0h1m9 13h13m-13 7h9"/>',
  database: '<ellipse cx="26" cy="12" rx="19" ry="8"/><path d="M7 12v27c0 4.4 8.5 8 19 8s19-3.6 19-8V12M7 25c0 4.4 8.5 8 19 8s19-3.6 19-8"/>',
  cloud: '<path d="M15 40H12a9 9 0 0 1-1-18 15 15 0 0 1 29-4 11 11 0 0 1 0 22h-3M26 44V23m-7 7 7-7 7 7"/>',
  plug: '<path d="M18 5v10m16-10v10M13 15h26v9a13 13 0 0 1-26 0Zm13 22v10"/>',
  workflow: '<rect x="18" y="3" width="16" height="12" rx="3"/><rect x="3" y="36" width="16" height="12" rx="3"/><rect x="33" y="36" width="16" height="12" rx="3"/><path d="M26 15v11M11 36V26h30v10"/>',
  devices: '<rect x="3" y="6" width="34" height="28" rx="4"/><path d="M20 34v9M12 43h16"/><rect x="34" y="20" width="15" height="27" rx="4"/><path d="M40 41h3"/>'
}
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
const curveY = (x) => 720 - 410 * (1 - Math.exp(-(x - 80) / 600))
const point = (x) => `${x.toFixed(2)} ${curveY(x).toFixed(2)}`
const curve = `M ${point(80)} ` + Array.from({ length: 160 }, (_, i) => `L ${point(90 + i * 10)}`).join(' ')
const logo = fs.readFileSync(path.join(root, 'assets/easy-vibe-logo-hd.svg'), 'utf8')
  .replace(/<svg[^>]*>/, '<svg x="72" y="34" width="190" height="82" viewBox="0 28 460 186">')
const stages = [
  ['01', 'Prototype', '产品原型', 'Find a problem. Validate it with real users.'],
  ['02', 'Full-Stack', '完整交付', 'Design, build, deploy, and get feedback.'],
  ['03', 'AI Workflows', '进阶开发', 'Coordinate agents. Build across platforms.']
]
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1760" height="1100" viewBox="0 0 1760 1100" role="img" aria-labelledby="title desc">
<title id="title">Easy Vibe: from idea to product engineer</title>
<desc id="desc">A course progression, not a software release timeline. Stage 1: research and validate user needs, build with Cursor or Claude, and integrate AI. Stage 2: Figma, GitHub, Supabase, Dify, Zeabur, and Stripe for complete delivery. Stage 3: Claude Code, MCP, Skills, Agent Teams, and cross-platform apps. Based on the course chapters in this repository.</desc>
<defs>
  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#dcebff" stop-opacity=".65"/><stop offset="1" stop-color="#f7faff" stop-opacity=".2"/></linearGradient>
  <linearGradient id="line" x1="0" x2="1"><stop stop-color="#08b4d4"/><stop offset=".45" stop-color="#2383ff"/><stop offset="1" stop-color="#0758ff"/></linearGradient>
  <radialGradient id="ambient"><stop stop-color="#e7f1ff"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#1e64bb" flood-opacity=".09"/></filter>
</defs>
<rect width="1760" height="1100" fill="#fff"/>
<ellipse cx="980" cy="700" rx="980" ry="390" fill="url(#ambient)"/>
${logo}
<g font-family="Inter, Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif">
  <text x="880" y="182" text-anchor="middle" fill="#0a0b10" font-size="65" font-weight="700" letter-spacing="-2.7">From idea to product engineer.</text>
  <text x="880" y="242" text-anchor="middle" fill="#475770" font-size="29">发现问题 · 验证需求 · 构建产品 · 持续迭代</text>
  <path d="${curve} L 1680 810 L 80 810 Z" fill="url(#area)"/>
  <path d="${curve}" fill="none" stroke="#e7f1ff" stroke-width="22" stroke-linecap="round"/>
  <path d="${curve}" fill="none" stroke="url(#line)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  ${nodes.map(([title, detail, chapter, icon], i) => {
    const x = 160 + i * 180
    const y = curveY(x)
    return `<g transform="translate(${x},${y.toFixed(2)})">
      <circle r="49" fill="#fff" stroke="#dbe8ff" stroke-width="1.5" filter="url(#shadow)"/>
      <g transform="translate(-26,-26)" fill="none" stroke="#1463ff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${icons[icon]}</g>
      <text y="86" text-anchor="middle" fill="#121c30" font-size="23" font-weight="600">${escape(title)}</text>
      <text y="116" text-anchor="middle" fill="#526783" font-size="17">${escape(detail)}</text>
    </g>`
  }).join('\n')}
  ${stages.map(([number, title, zh, detail], i) => {
    const x = 72 + i * 548
    return `<g transform="translate(${x},865)">
      <path d="M0 0H520" stroke="#cddfff" stroke-width="1.5"/>
      <text y="57" fill="#0864ff" font-size="40" font-weight="600">${number}</text>
      <text x="78" y="56" fill="#111827" font-size="32" font-weight="600">${title}</text>
      <text y="102" fill="#3e5372" font-size="25">${zh}</text>
      <text y="143" fill="#526783" font-size="21">${detail}</text>
    </g>`
  }).join('\n')}
</g>
</svg>
`
const output = path.join(root, 'assets/readme-panels/01-learning-path.svg')
if (process.argv.includes('--check')) {
  if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== svg) {
    throw new Error('Learning map is stale. Run node scripts/generate-readme-learning-map.mjs')
  }
  const links = (items) => items.flatMap((item) => [
    ...(item.link ? [item.link.replace(/^\/en\//, '').replace(/\/$/, '')] : []),
    ...links(item.items || [])
  ])
  const chapters = links([...productManagerSidebarEn, ...stage2SidebarEn, ...stage3SidebarEn])
  const readmes = [
    ['README.md', 'en'],
    ...fs.readdirSync(path.join(root, 'docs-readme')).filter((locale) =>
      fs.existsSync(path.join(root, 'docs-readme', locale, 'README.md'))
    ).map((locale) => [`docs-readme/${locale}/README.md`, locale === 'en-US' ? 'en' : locale.toLowerCase()])
  ]
  for (const [file, locale] of readmes) {
    const markdown = fs.readFileSync(path.join(root, file), 'utf8')
    if (!markdown.includes('readme-panels/01-learning-path.svg')) {
      throw new Error(`${file} does not reference the current vector learning map`)
    }
    for (const chapter of chapters) {
      const url = `https://datawhalechina.github.io/easy-vibe/${locale}/${chapter}/`
      if (!markdown.includes(url) || !fs.existsSync(path.join(root, 'docs', locale, chapter, 'index.md'))) {
        throw new Error(`${file} is missing a current course chapter or source: ${chapter}`)
      }
    }
  }
  console.log(`Verified vector map, ${sources.length} diagram sources, and ${chapters.length} course chapters in ${readmes.length} READMEs.`)
} else {
  fs.writeFileSync(output, svg)
  console.log(`Updated ${path.relative(root, output)}; verified ${sources.length} course sources.`)
}
