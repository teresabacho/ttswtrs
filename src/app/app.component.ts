import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ttswtrs';

  closeCollections(): void {
    document.querySelector(".fallContainer")?.classList.add("displayNone");
  }
}
