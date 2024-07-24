import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['src/@core/infra/controllers/*.{spec,test}.?(c|m)[jt]s?(x)'],
    coverage: {
      include: ['src/@core/infra/controllers'],
    },
  },
});