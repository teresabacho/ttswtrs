import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private opened: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  openBurger(): void {
    if (!this.opened) {
      document.querySelector(".burgerMenuBottom")?.classList.remove("displayNone");
      document.querySelector(".burgerMenuBottom")?.classList.add("displayFlex");

      document.querySelector(".burgerMenuButton")?.classList.remove("burgerMenuButtonClosed");
      document.querySelector(".burgerMenuButton")?.classList.add("burgerMenuButtonOpened");
      this.opened = true;
    } else {
      document.querySelector(".burgerMenuBottom")?.classList.remove("displayFlex");
      document.querySelector(".burgerMenuBottom")?.classList.add("displayNone");

      document.querySelector(".burgerMenuButton")?.classList.remove("burgerMenuButtonOpened");
      document.querySelector(".burgerMenuButton")?.classList.add("burgerMenuButtonClosed");
      this.opened = false;
    }
  }

  closeBurger(): void {
    document.querySelector(".burgerMenuBottom")?.classList.remove("displayFlex");
    document.querySelector(".burgerMenuBottom")?.classList.add("displayNone");

    document.querySelector(".burgerMenuButton")?.classList.remove("burgerMenuButtonOpened");
    document.querySelector(".burgerMenuButton")?.classList.add("burgerMenuButtonClosed");
    this.opened = false;
  }

  openCollections(): void {
    document.querySelector(".fallContainer")?.classList.remove("displayNone");

    document.querySelector(".fallContainerCollCat")?.classList.remove("displayNone");
    document.querySelector(".fallContainerCollCat")?.classList.add("displayFlex");
    document.querySelector(".exploreContainer")?.classList.add("displayNone");
    document.querySelector(".exploreContainer")?.classList.remove("displayFlex");
  }

  closeCollections(): void {
    document.querySelector(".fallContainer")?.classList.add("displayNone");
  }



  openExplore(): void {
    document.querySelector(".fallContainer")?.classList.remove("displayNone");
    document.querySelector(".fallContainerCollCat")?.classList.add("displayNone");
    document.querySelector(".fallContainerCollCat")?.classList.remove("displayFlex");
    document.querySelector(".exploreContainer")?.classList.remove("displayNone");
    document.querySelector(".exploreContainer")?.classList.add("displayFlex");
  }

  closeExplore(): void {
    document.querySelector(".fallContainer")?.classList.add("displayNone");
  }



}
