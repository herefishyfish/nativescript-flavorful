import {classesToString, classnames, WithChildren, WithClassname, WithDisabled} from '@flavorful/mitosis/shared';
import {useMetadata, useRef, useStore} from "@builder.io/mitosis";

type ButtonType =
  | ''
  | 'standard'
  | 'positive'
  | 'negative'
  | 'attention'
  | 'half'
  | 'ghost'
  | 'transparent'
  | 'emphasized'
  | 'menu';


export type ButtonProps = WithChildren<WithDisabled<WithClassname<{
  fdType?: ButtonType;
  compact?: boolean;
}>>>

useMetadata({
  styleUrls: ['./button.component.css']
})
export default function Button(props: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>();
  const state = useStore({
    get classes() {
      return classesToString([
        'fd-button',
        props.fdType ? `fd-button--${props.fdType}` : null,
        props.compact ? 'fd-button--compact' : null,
        props.disabled ? classnames.disabled : null,
        props.classname
      ]);
    },
  });
  return <button ref={buttonRef} className={state.classes} disabled={props.disabled}>{props.children}</button>
}
