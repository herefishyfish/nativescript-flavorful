import { getMinimumCycleCount, getColor } from '@flavorful/core';
import { Observable } from '@nativescript/core';

export class HelloWorldModel extends Observable {
    color = '';
    phaseCount = 0;

    private _counter: number;
    private _message: string;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();

        const cycle = getMinimumCycleCount();
        setInterval(() => {
          if(this.phaseCount > cycle) {
            this.phaseCount = 0;
          }
          this.color = getColor(this.phaseCount++);
          this.notifyPropertyChange("color", this.color);
        }, 1000 / 120)
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange("message", value);
        }
    }

    onTap() {
        this._counter--;
        this.updateMessage();
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = "Hoorraaay! You unlocked the NativeScript clicker achievement!";
        } else {
            this.message = `${this._counter} taps left`;
        }
    }
}
