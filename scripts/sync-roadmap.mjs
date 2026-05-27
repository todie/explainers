#!/usr/bin/env node
/**
 * Sync roadmap progress from Linear.
 *
 * Fetches milestone progress + targetDate from Linear project "Reverie"
 * and rewrites src/reverie/data/roadmap.js, updating only the dynamic
 * fields (progress, status, date, generatedAt). Static content (highlights,
 * V1_GATE) is preserved as-is.
 *
 * Usage:
 *   LINEAR_API_TOKEN=lin_api_... node scripts/sync-roadmap.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROADMAP_PATH = resolve(__dirname, '../src/reverie/data/roadmap.js')
const LINEAR_API = 'https://api.linear.app/graphql'
const PROJECT_ID = 'a758a4c8-ff3c-463e-836f-bd714755abc1'

const token = process.env.LINEAR_API_TOKEN
if (!token) {
  console.error('LINEAR_API_TOKEN not set')
  process.exit(1)
}

const query = `{
  projectMilestones(filter: { project: { id: { eq: "${PROJECT_ID}" } } }) {
    nodes { id name targetDate progress }
  }
}`

const res = await fetch(LINEAR_API, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: token },
  body: JSON.stringify({ query }),
})
const json = await res.json()
if (json.errors) {
  console.error('Linear API error:', JSON.stringify(json.errors, null, 2))
  process.exit(1)
}

const linearMilestones = json.data.projectMilestones.nodes

// Build lookup: version string → {progress, targetDate}
const byVersion = {}
for (const m of linearMilestones) {
  const match = m.name.match(/^(v\d+\.\d+(?:\.\d+)?)/)
  if (match) {
    const pct = Math.round(m.progress ?? 0)  // Linear returns 0–100, not 0–1
    byVersion[match[1]] = {
      progress: pct,
      date: m.targetDate ?? null,
    }
  }
}

// Read current roadmap.js source
let src = readFileSync(ROADMAP_PATH, 'utf8')
const today = new Date().toISOString().slice(0, 10)

// Update generatedAt
src = src.replace(/(generatedAt:\s*')[^']*(')/g, `$1${today}$2`)

// For each version in the file, update progress, status, and date
for (const [version, live] of Object.entries(byVersion)) {
  // Match the milestone block for this version
  // Pattern: version: 'vX.Y.Z', followed by name, status, date?, progress
  const versionEscaped = version.replace(/\./g, '\\.')
  const blockRe = new RegExp(
    `(version:\\s*'${versionEscaped}',[\\s\\S]*?progress:\\s*)\\d+`
  )
  src = src.replace(blockRe, `$1${live.progress}`)

  // Update status based on progress
  const newStatus = live.progress >= 100 ? 'shipped' : live.progress > 0 ? 'in-progress' : 'upcoming'
  const statusRe = new RegExp(
    `(version:\\s*'${versionEscaped}',[\\s\\S]*?status:\\s*)'[^']*'`
  )
  // Don't overwrite 'gate' status
  src = src.replace(statusRe, (match, prefix, offset) => {
    if (match.includes("'gate'")) return match
    return `${prefix}'${newStatus}'`
  })

  // Update date if Linear has one and it differs
  if (live.date) {
    const dateRe = new RegExp(
      `(version:\\s*'${versionEscaped}',[\\s\\S]*?date:\\s*)'[^']*'`
    )
    src = src.replace(dateRe, `$1'${live.date}'`)
  }
}

writeFileSync(ROADMAP_PATH, src)
console.log(`Updated roadmap.js (${today}) — ${Object.keys(byVersion).length} milestones synced from Linear`)
