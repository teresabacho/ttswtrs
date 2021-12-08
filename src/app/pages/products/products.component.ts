import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product/product.service";
import {IProduct} from "../../shared/model/product/product.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {OrderService} from "../../shared/services/order/order.service";
import {logEvent} from "@angular/fire/analytics";
import {AuthService} from "../../shared/services/auth/auth.service";
import {LikedService} from "../../shared/services/liked/liked.service";
import {IUser} from "../../shared/model/user/user.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public user!: IUser;
  public userFire: any = {};
  public userProducts: Array<IProduct> = [];
  public likesArr: Array<IProduct> = [];

  public products: Array<IProduct> = [];
  currentCategory: string = '';



  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    private likedService: LikedService
  ) {
    this.whatToLoad();
  }

  ngOnInit(): void {
    this.loadUserFromLocal();
    this.whatToLoad();
    this.loadUser();
  }

  whatToLoad(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.activatedRoute.snapshot.paramMap.get('categoryOrCollection') === "categories") {
          const categoryName = this.activatedRoute.snapshot.paramMap.get('name');
          this.loadProductsByCategory(categoryName as string);
          console.log("categoryName", categoryName);
        } else if (this.activatedRoute.snapshot.paramMap.get('name') === "all-collections") {
          this.loadProducts();
        } else {
          const collectionName = this.activatedRoute.snapshot.paramMap.get('name');
          this.loadProductsByCollection(collectionName as string);
          console.log("categoryOrCollection", collectionName);
        }
      }
    })
  }

  showDescription(id: any): void {
    document.getElementById(`${id}`)?.classList.remove("hidden");
    document.getElementById(`${id}`)?.classList.add("visible");

    // document.querySelector(".descriptionContainerBottom")?.classList.remove("hidden");
    // document.querySelector(".descriptionContainerBottom")?.classList.add("visible");
  }

  hideDescription(id: any): void {
    document.getElementById(`${id}`)?.classList.add("hidden");
    document.getElementById(`${id}`)?.classList.remove("visible");

    // document.querySelector(".descriptionContainerTop")?.classList.add("hidden");
    // document.querySelector(".descriptionContainerTop")?.classList.remove("visible");
    //
    // document.querySelector(".descriptionContainerBottom")?.classList.add("hidden");
    // document.querySelector(".descriptionContainerBottom")?.classList.remove("visible");
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.userProducts = data;
      }, err => {
        console.log(err)
      }
    )
    // console.log("products.ts loadProd", this.userProducts);
  }

  loadProductsByCategory(categoryName: string): void {
    this.productService.getProducts().subscribe(
      data => {
        this.userProducts = data.filter((item: { category: { path: string; }; }) => item.category.path === categoryName);
        console.log("this.userProducts", this.userProducts);
      }, err => {
        console.log(err)
      }
    )
  }

  loadProductsByCollection(collectionName: string): void {
    this.productService.getProducts().subscribe(
      data => {
        this.userProducts = data.filter((item: { collection: { path: string; }; }) => item.collection.path === collectionName);
        console.log("this.userProducts", this.userProducts);
      }, err => {
        console.log(err)
      }
    )
  }


  loadUserFromLocal(): void {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
    console.log(this.user)
  }


  loadUser(): void {
    this.authService.getUserInfoForLikes(this.user?.id).subscribe(
      data => {
        this.userFire = data;
      }, err => {
        console.log(err);
      }
    )
  }

  addToFavorites(product: IProduct): void {
    let currentProd = product;
    currentProd.liked = true;
    if (localStorage.getItem('user')) {
      this.likedService.addToLiked(currentProd);


      // if (this.userFire.liked?.length !== 0) {
      //   this.likesArr = this.userFire.liked?.filter((el: any) => el.id !== product.id);
      //   console.log(this.likesArr);
      //   this.likesArr.push(product);
      // } else {
      //   this.likesArr.push(product);
      // }
      // this.authService.updateUserLiked(this.user.id, this.likesArr)
      //   .then(() => {
      //     this.loadUser();
      //   })
      //   .catch(err => console.log(err))
      // product.liked = true;
      // this.productService.updateProduct(product, product.id)
      //   .then(() => {
      //     this.whatToLoad();
      //
      //   })
      // this.likesArr = [];

    } else {
      alert("You are not authorized!");
    }
  }

  removeFromFavorites(product: IProduct): void {

    this.likedService.removeFromLiked(product);

    // this.likesArr = this.userFire.liked.filter((el: any) => el.id !== product.id);
    // console.log(this.likesArr)
    // this.authService.updateUserLiked(this.user.id, this.likesArr)
    //   .then(() => {
    //     this.loadUser();
    //   })
    //   .catch(err => console.log(err))
    // product.liked = false;
    // this.productService.updateProduct(product, product.id)
    //   .then(() => {
    //     this.whatToLoad();
    //   })
    // this.likesArr = [];
  }

}
