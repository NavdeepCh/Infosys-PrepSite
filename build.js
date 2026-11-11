import * as esbuild from 'esbuild';

// Build analytics.js into a bundle that can be used in browsers
await esbuild.build({
  entryPoints: ['analytics.js'],
  bundle: true,
  outfile: 'dist/analytics.bundle.js',
  format: 'iife',
  minify: true,
  platform: 'browser',
});

console.log('✓ Analytics bundle built successfully at dist/analytics.bundle.js');
