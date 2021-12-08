import {Component} from '@angular/core';
import {CategoryService} from "./shared/services/category/category.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ttswtrs';

  constructor(
    private categoryService: CategoryService
  ) {

  }


  closeCollections(): void {
    document.querySelector("header")?.classList.remove("bgc");
    // document.querySelector("header")?.classList.remove("colored");
    // this.transparent = true;
    document.querySelector(".fallContainer")?.classList.add("displayNone");
  }
}
