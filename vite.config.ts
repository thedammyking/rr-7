import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from '@svgr/rollup';
import checker from 'vite-plugin-checker';

export default defineConfig(({ isSsrBuild, mode }) => {
	const isProduction = mode === 'production';
	return {
		build: {
			cssMinify: isProduction,
			minify: isProduction ? 'terser' : false,
			rollupOptions: {
				input: isSsrBuild ? './server/app.ts' : undefined,
				output: {
					manualChunks: {},
				},
				treeshake: isProduction,
			},
		},
		define: {
			global: 'window',
		},
		css: {
			postcss: {
				plugins: [tailwindcss, autoprefixer],
			},
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
				},
			},
		},
		plugins: [
			checker({
				typescript: true,
				//TODO:  eslint: {
				// 	lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
				// },
			}),
			reactRouter(),
			tsconfigPaths(),

			svgr({
				typescript: true,
				prettier: false,
				svgo: false,
				titleProp: true,
				ref: true,
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		server: {
			port: 3000,
			open: true,
		},
	};
});
