// scripts/extract-domains.ts
import * as fs from 'fs';
import * as path from 'path';

interface University {
  alpha_two_code: string;
  country: string;
  'state-province': string | null;
  domains: string[];
  name: string;
  web_pages: string[];
}

// Path to the big university file
const inputPath = path.join(process.cwd(), 'public', 'world_universities_and_domains.json');

// Read and parse the JSON
const universities: University[] = JSON.parse(
  fs.readFileSync(inputPath, 'utf8')
);

console.log(`Found ${universities.length} universities`);

// Extract all domains into a Set (automatically removes duplicates)
const domains = new Set<string>();

universities.forEach(university => {
  university.domains.forEach(domain => {
    // Normalize to lowercase for consistency
    domains.add(domain.toLowerCase());
  });
});

// Convert Set to sorted Array
const domainArray = Array.from(domains).sort();

// Save to new file
const outputPath = path.join(process.cwd(), 'public', 'university-domains.json');
fs.writeFileSync(
  outputPath,
  JSON.stringify(domainArray, null, 2)
);
