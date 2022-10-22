import { Component } from '@angular/core';
import { setStatusBarColor } from '../../../utils';
import { getMinimumCycleCount, RGB2Color, getColor } from '@flavorful/core';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  frequency = 0.05;
  count = 0;
  color;

  ngOnInit() {
    setStatusBarColor('dark', '#97d9e9');

    const cycle = getMinimumCycleCount(this.frequency);
    setInterval(() => {
      if(this.count > cycle) {
        this.count = 0;
      }
      this.color = getColor(this.count++, this.frequency);
    }, 1000 / 120)
  }
}
