export interface CompileOptions {
  components: string[];
  assets?: string[];
  controlValueAccessor?: boolean;
  angular?: { useAttributeSelector?: boolean },
  react?: {}
  vue?: {}
  svelte?: {}
}
