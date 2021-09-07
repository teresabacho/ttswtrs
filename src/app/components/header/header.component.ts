import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../shared/services/category/category.service";
import {ICategory} from "../../shared/model/category/category.model";
import {IProduct} from "../../shared/model/product/product.model";
import {ICollection} from "../../shared/model/collection/collection.model";
import {CollectionService} from "../../shared/services/collection/collection.service";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../shared/services/order/order.service";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public headerBasket: Array<IProduct> = [];
  public countBasket: number = 0;
  public nullOrMore: boolean = true;
  public adminCategories: Array<ICategory> = [];
  public adminCollections: Array<ICollection> = [];
  public route = this.activatedRoute.snapshot.paramMap.get('id');

  public isAdminLogged: boolean = false;
  public isUserLogged: boolean = false;

  public isBurgerMenuOpen: boolean = false;

  public isShopBurgerOpen: boolean = false;


  // private opened: boolean = false;
  // private extendBurgerOpened: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private collectionService: CollectionService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loadCollections();
    this.loadCategories();
    this.loadBasket();
    this.loadUser();
    this.updateBasket();
    this.checkLogin();
  }

  loadCollections(): void {
    setTimeout(() => {
      this.collectionService.getCollectionsFirebaseId().subscribe(
        data => {
          let idDt = data.map((el: { key: { value: any; }; }) => el.key)
          console.log(idDt)
          this.adminCollections.map((el, i) => {
            el.id = idDt[i]
          })
        },
        err => {
          console.log(err)
        }
      )
    }, 1000)
    this.collectionService.getCollectionsFirebaseData().subscribe(
      data => {
        this.adminCollections = data;
        console.log("this.adminCollections", this.adminCollections);
      }, err => {
        console.log(err)
      }
    )
  }

  loadCategories(): void {
    setTimeout(() => {
      this.categoryService.getCategoriesFirebaseId().subscribe(
        data => {
          let idDt = data.map((el: { key: { value: any; }; }) => el.key)
          console.log(idDt)
          this.adminCategories.map((el, i) => {
            el.id = idDt[i]
          })
        },
        err => {
          console.log(err)
        }
      )
    }, 1000)
    this.categoryService.getCategoriesFirebaseData().subscribe(
      data => {
        this.adminCategories = data;
        console.log("this.adminProducts", this.adminCategories);
      }, err => {
        console.log(err)
      }
    )
  }


  loadBasket(): void {
    if (localStorage.getItem('basket')) {
      this.headerBasket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getCount();
    console.log("header this.countBasket", this.countBasket);
    console.log("headerBasket", this.headerBasket);
  }

  getCount(): void {
    // if (this.headerBasket.length > 0) {
    this.countBasket = this.headerBasket.length;
    // } else {
    //   this.countBasket = 0;
    // }
  }


  updateBasket(): void {
    this.orderService.changeBasket$.subscribe(
      () => {
        this.loadBasket();
      }, err => {
        console.log(err);
      }
    )
  }

  loadUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      const currentUser = JSON.parse(<string>localStorage.getItem('user'));
      if (currentUser && currentUser.role === "ADMIN") {
        this.isAdminLogged = true;
      } else if (currentUser && currentUser.role === "USER") {
        this.isUserLogged = true;
      } else {
        this.isAdminLogged = false;
        this.isUserLogged = false;
      }
    } else {
      this.isAdminLogged = false;
      this.isUserLogged = false;
    }
  }

  checkLogin(): void {
    this.auth.loginStatus.subscribe(() => {
      this.loadUser();
    })
  }


  openBurger(): void {
    this.isBurgerMenuOpen = !this.isBurgerMenuOpen;


    // this.isShopBurgerOpen = !this.isShopBurgerOpen;


    console.log('burger', this.isBurgerMenuOpen);
    console.log('shop', this.isShopBurgerOpen);

    /* if (!this.opened) {
       // document.querySelector(".burgerMenuBottom")?.classList.remove("displayNone");
       // document.querySelector(".burgerMenuBottom")?.classList.add("displayFlex");

       // document.querySelector(".burgerMenuButton")?.classList.remove("uil-bars");
       // document.querySelector(".burgerMenuButton")?.classList.add("uil-multiply");
       this.opened = true;
     } else {
       // document.querySelector(".burgerMenuBottom")?.classList.remove("displayFlex");
       // document.querySelector(".burgerMenuBottom")?.classList.add("displayNone");

       // document.querySelector(".burgerMenuButton")?.classList.remove("uil-multiply");
       // document.querySelector(".burgerMenuButton")?.classList.add("uil-bars");

       // document.querySelector(".linksBox")?.classList.add("displayFlex");
       // document.querySelector(".linksBox")?.classList.remove("displayNone");

       // document.querySelector(".collectionsCategoriesBox")?.classList.add("displayNone");
       // document.querySelector(".collectionsCategoriesBox")?.classList.remove("displayFlex");

       // document.querySelector(".exploreBox")?.classList.add("displayNone");
       // document.querySelector(".exploreBox")?.classList.remove("displayFlex");

       // document.querySelector(".logoWrapper")?.classList.remove("displayNone");
       // document.querySelector(".backButton")?.classList.add("displayNone");

       this.opened = false;
     }*/
  }

  closeBurger(): void {
    document.querySelector(".burgerMenuBottom")?.classList.remove("displayFlex");
    document.querySelector(".burgerMenuBottom")?.classList.add("displayNone");

    document.querySelector(".burgerMenuButton")?.classList.remove("uil-multiply");
    document.querySelector(".burgerMenuButton")?.classList.add("uil-bars");
    // this.opened = false;

    document.querySelector(".linksBox")?.classList.add("displayFlex");
    document.querySelector(".linksBox")?.classList.remove("displayNone");
    document.querySelector(".collectionsCategoriesBox")?.classList.add("displayNone");
    document.querySelector(".collectionsCategoriesBox")?.classList.remove("displayFlex");
    document.querySelector(".exploreBox")?.classList.add("displayNone");
    document.querySelector(".exploreBox")?.classList.remove("displayFlex");
    document.querySelector(".logoWrapper")?.classList.remove("displayNone");
    document.querySelector(".backButton")?.classList.add("displayNone");
  }

  openShopBurger(): void {
    this.isShopBurgerOpen = !this.isShopBurgerOpen;

    console.log('shop', this.isShopBurgerOpen);
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

  openExploreBurger(): void {
    document.querySelector(".exploreBox")?.classList.remove("displayNone");
    document.querySelector(".exploreBox")?.classList.add("displayFlex");
    document.querySelector(".linksBox")?.classList.remove("displayFlex");
    document.querySelector(".linksBox")?.classList.add("displayNone");

    document.querySelector(".logoWrapper")?.classList.add("displayNone");
    document.querySelector(".backButton")?.classList.remove("displayNone");
  }

  back(): void {
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
