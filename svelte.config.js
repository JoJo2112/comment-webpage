import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: vercel({
      // if true, will deploy the app using edge functions
      // (https://vercel.com/docs/concepts/functions/edge-functions)
      // rather than serverless functions
      edge: false,

      // an array of dependencies that esbuild should treat
      // as external when bundling functions
      external: ['pg-native'],

      // if true, will split your app into multiple functions
      // instead of creating a single one for the entire app
      split: false,
    }),
    vite: () => ({
      ssr: {
        external: ['pg-native'],
      },
      optimizeDeps: {
        exclude: ['pg-native'],
      },
    }),
  },
};

export default config;
