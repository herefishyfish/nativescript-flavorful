import {Observable} from "rxjs";

export interface ValueAccessorInterface {
  value: any;
  valueChange: Observable<any>;
  disabled: boolean;
}
