import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: () => ({
      ssr: {
        external: ['pg', 'dotenv'],
      },
    }),
  },
};

export default config;
