import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace ${something.toFixed(2)} with {something.toFixed(2)} DT
  content = content.replace(/\$\{([^}]+\.toFixed\([^)]+\))\}/g, '{ $1 } DT');
  content = content.replace(/\$([0-9]+(?:\.[0-9]+)?)/g, '$1 DT');
  
  // Special cases for strings where it's \$...
  content = content.replace(/\$([a-zA-Z_]+)/g, '$1 DT');

  // Let's be more precise
  let newContent = content;
  newContent = newContent.replace(/>\$</g, '> DT <');
  newContent = newContent.replace(/>\$\{/g, '>{');
  newContent = newContent.replace(/\.toFixed\(2\)\}<\/span>/g, '.toFixed(2)} DT</span>');
  newContent = newContent.replace(/\.toFixed\(2\)\}<\/p>/g, '.toFixed(2)} DT</p>');
  newContent = newContent.replace(/\.toFixed\(2\)\}<\/div>/g, '.toFixed(2)} DT</div>');
  newContent = newContent.replace(/\.toFixed\(2\)\}<\/TableCell>/g, '.toFixed(2)} DT</TableCell>');
  
  // For checkout/page.tsx template strings
  newContent = newContent.replace(/\(\$\$\{/g, '({');
  newContent = newContent.replace(/\.toFixed\(2\)\}\)/g, '.toFixed(2)} DT)');
  newContent = newContent.replace(/\*\$\$\{/g, '* {');
  newContent = newContent.replace(/\.toFixed\(2\)\}\\n/g, '.toFixed(2)} DT\\n');
  newContent = newContent.replace(/:\*\s\$\$\{total\.toFixed\(2\)\}/g, ':* {total.toFixed(2)} DT');

  fs.writeFileSync(filePath, newContent, 'utf8');
}

const files = [
  'app/(storefront)/cart/page.tsx',
  'app/(storefront)/checkout/page.tsx',
  'app/(storefront)/product/[id]/page.tsx',
  'app/admin/orders/page.tsx',
  'app/admin/points/page.tsx',
  'app/admin/products/[id]/edit/EditProductForm.tsx',
  'app/admin/products/new/page.tsx',
  'app/admin/products/page.tsx',
  'components/ProductCard.tsx'
];

files.forEach(f => {
  const p = path.join(process.cwd(), f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    // Basic replacements
    content = content.replace(/>\$</g, '><'); // remove hanging $
    
    // JSX ${var} replaced by {var} DT
    content = content.replace(/>\$\{(.*?\.toFixed\(2\))\}/g, '>{$1} DT');
    // String templates ($${var}) -> (${var} DT)
    content = content.replace(/\$\$\{(.*?\.toFixed\(2\))\}/g, '${$1} DT');
    // Other raw string uses
    content = content.replace(/On orders over \$50/g, 'On orders over 50 DT');
    content = content.replace(/Price \(\$\)/g, 'Price (DT)');
    
    fs.writeFileSync(p, content, 'utf8');
  }
});
