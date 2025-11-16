#!/usr/bin/env node
/**
 * Simple exemplar scaffolder.
 *
 * Usage:
 *   node generate-exemplars.js exemplars-manifest.json
 *
 * The manifest is an array of exemplar definitions:
 * [
 *   {
 *     "title": "Quickstart: Basic bind and resolve",
 *     "slug": "quickstart-basic-bind",
 *     "category": "quickstart",
 *     "level": "beginner",
 *     "author": "your-gh-user"
 *   }
 * ]
 *
 * The script creates folders under docs/exemplars/<slug> with:
 * - README.md (from exemplar-template)
 * - example.cs
 * - metadata.json
 *
 * This is intentionally tiny and does not parse C# or Unity projects.
 */

const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node generate-exemplars.js <manifest.json>');
  process.exit(2);
}

const manifestPath = process.argv[2];
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (e) {
  console.error('Failed to read or parse manifest:', e.message);
  process.exit(2);
}

const outBase = path.join(process.cwd(), 'docs', 'exemplars');

if (!fs.existsSync(outBase)) fs.mkdirSync(outBase, { recursive: true });

function slugify(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

manifest.forEach((m) => {
  const slug = m.slug || slugify(m.title || 'example');
  const dir = path.join(outBase, slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // metadata.json
  const metadata = {
    title: m.title || 'Untitled Example',
    slug,
    category: m.category || 'quickstart',
    level: m.level || 'beginner',
    author: m.author || '',
    created_at: new Date().toISOString().slice(0, 10),
    tags: m.tags || []
  };
  fs.writeFileSync(path.join(dir, 'metadata.json'), JSON.stringify(metadata, null, 2), 'utf8');

  // README.md (basic)
  const readme = `# ${metadata.title}

Category: ${metadata.category}
Level: ${metadata.level}

Short description: Add a short description here.

## Setup

1. Copy the example files into a Unity project or compile with dotnet.
2. Follow the instructions below to run.

## Example

See example.cs for a minimal code sample.

## Run

- Unity: Import the folder into your Unity project and attach the example scripts to a GameObject.
- dotnet: Use a simple console harness if relevant.
`;
  fs.writeFileSync(path.join(dir, 'README.md'), readme, 'utf8');

  // example.cs
  const exampleCs = `// ${metadata.title}
// Place this file in a Unity project (Assets/) or compile with dotnet for non-Unity tests.
// This is a scaffold: replace the contents with a focused example.

using System;

namespace BoltWire.Examples
{
    // Example interface and implementation
    public interface IGreetingService
    {
        string Greet(string name);
    }

    public class GreetingService : IGreetingService
    {
        public string Greet(string name) => $"Hello, {name} from BoltWire!";
    }

    // Minimal console harness (non-Unity)
    public class Program
    {
        public static void Main(string[] args)
        {
            // TODO: Replace with BoltWire container setup, bindings, and resolution.
            Console.WriteLine("Replace this harness with BoltWire registration and resolution.");
            var svc = new GreetingService();
            Console.WriteLine(svc.Greet(\"world\"));
        }
    }
}
`;
  fs.writeFileSync(path.join(dir, 'example.cs'), exampleCs, 'utf8');

  console.log('Created exemplar:', dir);
});

console.log('Done. Review the generated folders under docs/exemplars/');
