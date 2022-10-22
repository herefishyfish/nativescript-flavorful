import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ValueAccessorDirective} from "./value-accessor.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [
    ValueAccessorDirective
  ],
  exports: [
    ValueAccessorDirective
  ]
})
export class CvaModule {
}
