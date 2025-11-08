import { readdir, readFile, writeFile } from 'fs/promises';
import { existsSync, statSync } from 'fs';
import { join, dirname, extname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = join(__dirname, '..', 'dist');

// Regex to match relative imports without .js extension
const importRegex = /from\s+['"](\.\.?\/[^'"]+)['"]/g;
const exportRegex = /export\s+.*\s+from\s+['"](\.\.?\/[^'"]+)['"]/g;

async function getAllJsFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllJsFiles(fullPath));
    } else if (entry.isFile() && extname(entry.name) === '.js') {
      files.push(fullPath);
    }
  }
  
  return files;
}

function resolveImportPath(importPath, fromFile) {
  // Don't modify if it already has an extension
  if (importPath.match(/\.(js|json|ts)$/)) {
    return importPath;
  }
  
  const fromDir = dirname(fromFile);
  const resolvedPath = resolve(fromDir, importPath);
  
  // Check if it's a directory
  if (existsSync(resolvedPath)) {
    const stat = statSync(resolvedPath);
    if (stat.isDirectory()) {
      // It's a directory, check for index.js
      const indexPath = join(resolvedPath, 'index.js');
      if (existsSync(indexPath)) {
        return `${importPath}/index.js`;
      }
    }
  }
  
  // Check if .js file exists
  if (existsSync(`${resolvedPath}.js`)) {
    return `${importPath}.js`;
  }
  
  // Default: assume it's a file and add .js
  // If it looks like a directory (no dots in last part), try /index.js
  const parts = importPath.split('/');
  const lastPart = parts[parts.length - 1];
  
  if (!lastPart.includes('.') && !importPath.endsWith('/')) {
    // Might be a directory, try /index.js
    return `${importPath}/index.js`;
  }
  
  return `${importPath}.js`;
}

function fixImports(content, filePath) {
  // Fix import statements
  let fixed = content.replace(importRegex, (match, importPath) => {
    const resolved = resolveImportPath(importPath, filePath);
    return match.replace(importPath, resolved);
  });
  
  // Fix export statements
  fixed = fixed.replace(exportRegex, (match, importPath) => {
    const resolved = resolveImportPath(importPath, filePath);
    return match.replace(importPath, resolved);
  });
  
  return fixed;
}

async function processFile(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const fixed = fixImports(content, filePath);
  
  if (content !== fixed) {
    await writeFile(filePath, fixed, 'utf-8');
    console.log(`Fixed imports in: ${relative(distDir, filePath)}`);
    return true;
  }
  return false;
}

async function main() {
  try {
    const files = await getAllJsFiles(distDir);
    let fixedCount = 0;
    
    for (const file of files) {
      const wasFixed = await processFile(file);
      if (wasFixed) fixedCount++;
    }
    
    console.log(`Processed ${files.length} file(s), fixed ${fixedCount} file(s)`);
  } catch (error) {
    console.error('Error fixing imports:', error);
    process.exit(1);
  }
}

main();
