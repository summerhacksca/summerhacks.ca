const GITHUB_URL =
  'https://raw.githubusercontent.com/Hipo/university-domains-list/refs/heads/master/world_universities_and_domains.json'

interface University {
  domains: string[]
  [key: string]: unknown
}

// Starts loading immediately when the module is first imported.
// The promise is cached — subsequent awaits resolve instantly.
const domainsPromise: Promise<Set<string>> = loadDomains()

async function loadDomains(): Promise<Set<string>> {
  try {
    const res = await fetch(GITHUB_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const universities: University[] = await res.json()
    const domains = new Set<string>()
    for (const uni of universities) {
      for (const d of uni.domains) {
        domains.add(d.toLowerCase())
      }
    }
    console.log(`Loaded ${domains.size} university domains from GitHub`)
    return domains
  } catch (err) {
    console.error('Failed to fetch university domains, falling back to local file:', err)
    const local: string[] = (await import('@/public/university-domains.json')).default
    return new Set<string>(local)
  }
}

export function getValidDomains(): Promise<Set<string>> {
  return domainsPromise
}
