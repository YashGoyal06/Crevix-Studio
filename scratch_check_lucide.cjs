const lucide = require('lucide-react');
console.log("Exports containing 'Git':", Object.keys(lucide).filter(k => k.includes('Git') || k.includes('git')));
console.log("Exports containing 'Link':", Object.keys(lucide).filter(k => k.includes('Link') || k.includes('link')));
console.log("Exports containing 'Insta':", Object.keys(lucide).filter(k => k.includes('Insta') || k.includes('insta')));
console.log("Exports containing 'Glob':", Object.keys(lucide).filter(k => k.includes('Glob') || k.includes('glob')));
