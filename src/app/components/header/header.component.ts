import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../shared/services/category/category.service";
import {ICategory} from "../../shared/model/category/category.model";
import {IProduct} from "../../shared/model/product/product.model";
import {ICollection} from "../../shared/model/collection/collection.model";
import {CollectionService} from "../../shared/services/collection/collection.service";
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
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

  public isAdminLogged: boolean = false;
  public isUserLogged: boolean = false;

  public isBurgerMenuOpen: boolean = false;
  public isShopBurgerOpen: boolean = false;
  public isExploreBurgerOpen: boolean = false;
  public isBackOpen: boolean = false;


  constructor(
    private categoryService: CategoryService,
    private collectionService: CollectionService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
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
    this.collectionService.getCollections().subscribe(
      data => {
        this.adminCollections = data;
      }, err => {
        console.log(err)
      }
    )
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.adminCategories = data;
      }, err => {
        console.log(err)
      }
    )
  }


  loadBasket(): void {
    if (localStorage.getItem('basket')) {
      this.headerBasket = JSON.parse(localStorage.getItem('basket') as string);
    }
    else {
      this.headerBasket = [];
    }
    this.getCount();
  }

  getCount(): void {

    this.countBasket = this.headerBasket.length;
    console.log(this.countBasket)
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
    this.isShopBurgerOpen = false;
    this.isExploreBurgerOpen = false;
    this.isBackOpen = false;
  }

  closeBurger(): void {
    this.isBurgerMenuOpen = false;
    this.isShopBurgerOpen = false;
    this.isExploreBurgerOpen = false;
    this.isBackOpen = false;
  }

  openShopBurger(): void {
    this.isShopBurgerOpen = true;
    this.isBackOpen = true;
  }

  openExploreBurger(): void {
    this.isExploreBurgerOpen = true;
    this.isBackOpen = true;
  }

  backBtn(): void {
    this.isBackOpen = false;
    this.isShopBurgerOpen = false;
    this.isExploreBurgerOpen = false;
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
