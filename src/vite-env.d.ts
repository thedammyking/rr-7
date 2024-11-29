/// <reference types="vite/client" />

declare module 'rollup-plugin-svgr';

declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}

declare module '*.scss' {
	const content: { [className: string]: string };
	export default content;
}

declare module '*.svg' {
	import * as React from 'react';
	const svgUrl: string;
	const svgComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>;

	export default svgUrl;
	export { svgComponent as ReactComponent };
}
