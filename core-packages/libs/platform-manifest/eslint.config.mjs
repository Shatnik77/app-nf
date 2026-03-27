import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}'],
          ignoredDependencies: [
            '@angular/forms',
            '@angular/material',
            '@angular/animations',
            '@angular/platform-browser',
            '@angular-architects/native-federation-runtime',
            'rxjs',
            'tslib'
          ],
          // Ensure it doesn't try to move peerDeps to regular deps
          checkPeerDependencies: false, 
          checkHelpers: false
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
