# Contributing

Thank you for your interest in contributing to this Nuxt + shadcn-vue boilerplate!

Please review this document before submitting a pull request. For questions or help, reach out via [Discord](https://discord.gg/u6TX9Gnb) or open an issue.

## About this Boilerplate

This repository provides a starter template for Nuxt projects using shadcn-vue components, Tailwind CSS, and related tooling.

- Uses [pnpm](https://pnpm.io) for package management.
- Components are managed via [shadcn-vue](https://shadcn-vue.com/).

## Project Structure

```
app/
  assets/
      css/
        tailwind.css
  components/
    ui/
  composables/
  layouts/
  middleware/
  pages/
  plugins/
  utils/
  app.vue
  app.config.ts
  error.vue
content/
modules/
public/
server/
shared/
.env
.gitignore
.nuxtignore
.nuxtrc
nuxt.config.ts
package.json
tsconfig.json
```

| Path                        | Description                                 |
|-----------------------------|---------------------------------------------|
| `components/ui`             | UI components (shadcn-vue)                  |
| `@/assets/css/tailwind.css`   | Tailwind CSS entry                          |
| `nuxt.config.ts`            | Nuxt configuration                          |
| `content/`                  | Content files (if using @nuxt/content)      |

## Getting Started

### Clone the repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

## Adding or Modifying Components

- Place new UI components in `components/ui` or `app/components/ui` as configured.
- If you add or update components, ensure you update any relevant documentation or usage examples.

## Commit Convention

Please use [Conventional Commits](https://www.conventionalcommits.org/) for your commit messages:

- `feat`: new features
- `fix`: bug fixes
- `docs`: documentation changes
- `refactor`: code refactoring
- `test`: adding or updating tests
- `build`: build system or dependency changes
- `ci`: CI/CD configuration
- `chore`: other changes

Example: `feat(ui): add Button component`

## Testing

If you add features or fix bugs, please add or update tests if possible. Run all tests before submitting:

```bash
pnpm test
```

## Requests & Issues

For feature requests or issues, please open a discussion or issue on GitHub.

---
Happy coding!
