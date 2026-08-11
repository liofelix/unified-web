# Vite+ Monorepo Starter

A starter for creating a Vite+ monorepo.

## Development

- Check everything is ready:

```bash
vp run ready
```

- Run the tests:

```bash
vp run -r test
```

- Build the monorepo:

```bash
vp run -r build
```

- Run the development server:

```bash
vp run dev
```

- Run the unified-vue application:

```bash
vp -C apps/unified-vue dev
```

- Build only the unified-vue application:

```bash
vp run --filter ./apps/unified-vue build
```
