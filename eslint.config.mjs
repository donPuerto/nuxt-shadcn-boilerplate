// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.js'],
  plugins: {   
    //
  },

  rules: {
    
    // Disables the rule requiring multi-word component names 
    'vue/multi-word-component-names': 'off',

    // Disables the rule that requires a single root node in Vue components
    'vue/no-multiple-template-root': 'off',

    // Enforces a specific order of component tags: <script>, then <template>, then <style>
    "vue/block-order": ["error", {
    "order": [ [ "script", "template" ], "style" ]
    }]
  },
  ignores: [
    '.nuxt',
    '.output',
    'node_modules',
    'dist',
    'coverage',
    'public',
    'static',
    'content/**/*.md', // subfolders
    'content/*.md',    // root-level markdown files
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '.env*'
  ],
})
