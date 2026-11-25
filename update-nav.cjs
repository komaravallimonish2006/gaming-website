const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;
const files = fs.readdirSync(directoryPath);

const newNav = `    <div id="navbar-root"></div>\n    <script type="module" src="/src/navbar-mount.tsx"></script>`;

files.forEach(file => {
  if (file.endsWith('.html') && file !== 'index.html') {
    const filePath = path.join(directoryPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the starting <nav> tag
    const navStartMatch = content.match(/<nav\b[^>]*>/);
    if (navStartMatch) {
      const startIndex = navStartMatch.index;
      // Find the closing </nav> tag after the start index
      const endIndex = content.indexOf('</nav>', startIndex) + 6;
      
      if (endIndex > 6) {
        content = content.substring(0, startIndex) + newNav + content.substring(endIndex);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated navbar in ${file}`);
      }
    }
  }
});
