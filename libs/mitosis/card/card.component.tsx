import {useMetadata, useStore} from "@builder.io/mitosis";
import {classesToString, WithChildren} from "@flavorful/mitosis/shared";

export type CardProps = WithChildren<{
  slotTitle?: any;
  slotContent?: any;
}>;

useMetadata({
  styleUrls: ['./card.component.css'],
  encapsulation: 2
})
export default function Card(props: CardProps) {
  const state = useStore({
    get classes() {
      return classesToString(['fd-card']);
    }
  });

  return (<StackLayout className={state.classes}>
    <Label text={props.slotTitle} class="h1"></Label>
    <Label text={props.slotContent}></Label>
    {props.children}
  </StackLayout>);
}
