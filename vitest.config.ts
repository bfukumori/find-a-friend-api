import tsconfigPaths from 'vite-tsconfig-paths';
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        ...defaultExclude,
        'src/@core/domain/constants',
        'src/@core/infra/@types',
        'src/@core/domain/errors',
      ],
    },
  },
});
