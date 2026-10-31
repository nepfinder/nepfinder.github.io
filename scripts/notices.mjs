/**
 * Writes public/third-party-notices.txt with the license text of every production dependency,
 * so the copyright notices required by MIT, ISC, BSD, and Apache-2.0 ship with the site.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const lock = JSON.parse(readFileSync(path.join(root, 'package-lock.json'), 'utf8')).packages
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'))

const seen = new Map()
function visit(name, from = '') {
  const nested = `${from ? from + '/' : ''}node_modules/${name}`
  const key = lock[nested] ? nested : `node_modules/${name}`
  const entry = lock[key]
  if (!entry || seen.has(key)) return
  seen.set(key, entry)
  for (const dep of Object.keys(entry.dependencies ?? {})) visit(dep, key)
  for (const dep of Object.keys(entry.peerDependencies ?? {})) if (lock[`node_modules/${dep}`]) visit(dep)
}
for (const dep of Object.keys(pkg.dependencies)) visit(dep)

const blocks = []
for (const [key, entry] of [...seen].sort((a, b) => a[0].localeCompare(b[0]))) {
  const dir = path.join(root, key)
  const name = key.replace(/.*node_modules\//, '')
  const file = existsSync(dir) ? readdirSync(dir).find((f) => /^(licen[cs]e|copying)(\.|$)/i.test(f)) : undefined
  const text = file ? readFileSync(path.join(dir, file), 'utf8').trim() : `License: ${entry.license ?? 'see package'}`
  blocks.push(`${name}@${entry.version} (${entry.license ?? 'see license text'})\n${'-'.repeat(60)}\n${text}`)
}

const header = `Third-party notices for nepfinder.com.np
Generated ${new Date().toISOString().slice(0, 10)} from the production dependencies of this site.

Fonts: Inter and Noto Sans Devanagari are served by Google Fonts under the SIL Open Font License 1.1.
On Apple devices the site uses the system font (SF Pro) installed on the device; no Apple font files are distributed.
Icons: Lucide (ISC), included below as lucide-react. Flag and infographic artwork was drawn for this site.
ERPNext and Frappe are trademarks of Frappe Technologies Pvt. Ltd. Google Play is a trademark of Google LLC.
eSewa, Khalti, IME Pay, and SCT nPay are trademarks of their respective owners.
`
writeFileSync(path.join(root, 'public', 'third-party-notices.txt'), `${header}\n\n${blocks.join('\n\n\n')}\n`)
console.log(`third-party notices: ${blocks.length} packages`)
