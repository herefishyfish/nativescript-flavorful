import {InjectionToken} from "@angular/core";
import {ValueAccessorInterface} from "./value-accessor.interface";

export const ValueProvider = new InjectionToken<ValueAccessorInterface>('Value provider');
