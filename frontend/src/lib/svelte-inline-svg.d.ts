declare module 'svelte-inline-svg' {
    import { SvelteComponentTyped } from 'svelte';
    export class InlineSvgProps {
      src: string;
      transformSrc?: (src: SVGElement) => SVGElement;
      [attribute: string]: unknown;
    }
    export default class InlineSvg extends SvelteComponentTyped<InlineSvgProps> { }
  }