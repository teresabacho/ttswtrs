import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public opened: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  openBurger(): void {
    if(!this.opened){
      document.querySelector(".burgerMenuBottom")?.classList.remove("displayNone");
      document.querySelector(".burgerMenuBottom")?.classList.add("displayFlex");
      this.opened = true;
    } else {
      document.querySelector(".burgerMenuBottom")?.classList.remove("displayFlex");
      document.querySelector(".burgerMenuBottom")?.classList.add("displayNone");
      this.opened = false;
    }
  }


}
