import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Directive, forwardRef, inject, OnDestroy} from "@angular/core";
import {ValueAccessorInterface} from "./value-accessor.interface";
import {filter, Subscription, tap} from "rxjs";
import {ValueProvider} from "./value-provider";

@Directive({
  selector: 'fd-checkbox-control, fd-input-control, fd-textarea, fd-segmented-button',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueAccessorDirective),
      multi: true,
    }
  ]
})
export class ValueAccessorDirective implements ControlValueAccessor, OnDestroy {
  private onChange: (value: any) => void = () => {
    /**/
  };
  private onTouched: () => void = () => {
    /**/
  };
  protected lastValue: any;
  protected valueChangeSubscription: Subscription;
  private component: ValueAccessorInterface = inject(ValueProvider, {
    host: true,
    optional: false
  });

  constructor() {
    this.valueChangeSubscription = this.component.valueChange.pipe(
      filter((value) => value !== this.lastValue),
      tap((value) => this.lastValue = value),
      tap((value) => this.component.value = value),
      tap((value) => this.onChange(value))
    ).subscribe();
  }

  writeValue(value: any): void {
    this.component.value = this.lastValue = value == null ? '' : value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.component.disabled = isDisabled;
  }

  ngOnDestroy() {
    this.valueChangeSubscription.unsubscribe();
  }
}
