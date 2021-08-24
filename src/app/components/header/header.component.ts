import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private opened: boolean = false;
  private extendBurgerOpened: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  openBurger(): void {
    if (!this.opened) {
      document.querySelector(".burgerMenuBottom")?.classList.remove("displayNone");
      document.querySelector(".burgerMenuBottom")?.classList.add("displayFlex");

      document.querySelector(".burgerMenuButton")?.classList.remove("uil-bars");
      document.querySelector(".burgerMenuButton")?.classList.add("uil-multiply");
      this.opened = true;
    } else {
      document.querySelector(".burgerMenuBottom")?.classList.remove("displayFlex");
      document.querySelector(".burgerMenuBottom")?.classList.add("displayNone");

      document.querySelector(".burgerMenuButton")?.classList.remove("uil-multiply");
      document.querySelector(".burgerMenuButton")?.classList.add("uil-bars");

      document.querySelector(".linksBox")?.classList.add("displayFlex");
      document.querySelector(".linksBox")?.classList.remove("displayNone");
      document.querySelector(".collectionsCategoriesBox")?.classList.add("displayNone");
      document.querySelector(".collectionsCategoriesBox")?.classList.remove("displayFlex");
      document.querySelector(".exploreBox")?.classList.add("displayNone");
      document.querySelector(".exploreBox")?.classList.remove("displayFlex");
      document.querySelector(".logoWrapper")?.classList.remove("displayNone");
      document.querySelector(".backButton")?.classList.add("displayNone");

      this.opened = false;
    }
  }

  closeBurger(): void {
    document.querySelector(".burgerMenuBottom")?.classList.remove("displayFlex");
    document.querySelector(".burgerMenuBottom")?.classList.add("displayNone");

    document.querySelector(".burgerMenuButton")?.classList.remove("uil-multiply");
    document.querySelector(".burgerMenuButton")?.classList.add("uil-bars");
    this.opened = false;

    document.querySelector(".linksBox")?.classList.add("displayFlex");
    document.querySelector(".linksBox")?.classList.remove("displayNone");
    document.querySelector(".collectionsCategoriesBox")?.classList.add("displayNone");
    document.querySelector(".collectionsCategoriesBox")?.classList.remove("displayFlex");
    document.querySelector(".exploreBox")?.classList.add("displayNone");
    document.querySelector(".exploreBox")?.classList.remove("displayFlex");
    document.querySelector(".logoWrapper")?.classList.remove("displayNone");
    document.querySelector(".backButton")?.classList.add("displayNone");
  }


  openCollections(): void {
    document.querySelector("header")?.classList.add("bgc");

    document.querySelector(".fallContainer")?.classList.remove("displayNone");

    document.querySelector(".fallContainerCollCat")?.classList.remove("displayNone");
    document.querySelector(".fallContainerCollCat")?.classList.add("displayFlex");
    document.querySelector(".exploreContainer")?.classList.add("displayNone");
    document.querySelector(".exploreContainer")?.classList.remove("displayFlex");
  }

  closeCollections(): void {
    document.querySelector("header")?.classList.remove("bgc");

    document.querySelector(".fallContainer")?.classList.add("displayNone");
  }


  openExplore(): void {
    document.querySelector("header")?.classList.add("bgc");

    document.querySelector(".fallContainer")?.classList.remove("displayNone");
    document.querySelector(".fallContainerCollCat")?.classList.add("displayNone");
    document.querySelector(".fallContainerCollCat")?.classList.remove("displayFlex");
    document.querySelector(".exploreContainer")?.classList.remove("displayNone");
    document.querySelector(".exploreContainer")?.classList.add("displayFlex");
  }

  closeExplore(): void {
    document.querySelector(".fallContainer")?.classList.add("displayNone");
    document.querySelector("header")?.classList.remove("bgc");
  }

  addHeaderColor(): void {
    document.querySelector("header")?.classList.add("bgc");
  }


  openCollectionsBurger(): void {
    document.querySelector(".collectionsCategoriesBox")?.classList.remove("displayNone");
    document.querySelector(".collectionsCategoriesBox")?.classList.add("displayFlex");
    document.querySelector(".linksBox")?.classList.remove("displayFlex");
    document.querySelector(".linksBox")?.classList.add("displayNone");

    document.querySelector(".logoWrapper")?.classList.add("displayNone");
    document.querySelector(".backButton")?.classList.remove("displayNone");
  }

  openExploreBurger():void{
    document.querySelector(".exploreBox")?.classList.remove("displayNone");
    document.querySelector(".exploreBox")?.classList.add("displayFlex");
    document.querySelector(".linksBox")?.classList.remove("displayFlex");
    document.querySelector(".linksBox")?.classList.add("displayNone");

    document.querySelector(".logoWrapper")?.classList.add("displayNone");
    document.querySelector(".backButton")?.classList.remove("displayNone");
  }

  back():void{
    document.querySelector(".exploreBox")?.classList.add("displayNone");
    document.querySelector(".exploreBox")?.classList.remove("displayFlex");
    document.querySelector(".collectionsCategoriesBox")?.classList.add("displayNone");
    document.querySelector(".collectionsCategoriesBox")?.classList.remove("displayFlex");
    document.querySelector(".linksBox")?.classList.add("displayFlex");
    document.querySelector(".linksBox")?.classList.remove("displayNone");
    document.querySelector(".logoWrapper")?.classList.remove("displayNone");
    document.querySelector(".backButton")?.classList.add("displayNone");
  }

}
