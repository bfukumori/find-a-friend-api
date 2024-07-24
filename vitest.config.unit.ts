import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: [
      'src/@core/domain/use-cases/*.{spec,test}.?(c|m)[jt]s?(x)',
      'src/@core/domain/entities/*.{spec,test}.?(c|m)[jt]s?(x)',
    ],
    coverage: {
      include: ['src/@core/domain/use-cases', 'src/@core/domain/entities'],
    },
  },
});
