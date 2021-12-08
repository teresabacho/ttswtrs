import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../shared/model/product/product.model";
import {ProductService} from "../../shared/services/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../shared/services/order/order.service";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-liked',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public user: any;
  public userFire: any = {};
  public userFavorites: Array<IProduct> = [];
  public likesArr: Array<IProduct> = [];
  public length: number = 0;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.loadUserFromLocal();
    this.loadUser();
  }

  showDescription(id: number | string): void {
    document.getElementById(`${id}`)?.classList.remove("hidden");
    document.getElementById(`${id}`)?.classList.add("visible");
  }

  hideDescription(id: number | string): void {
    document.getElementById(`${id}`)?.classList.add("hidden");
    document.getElementById(`${id}`)?.classList.remove("visible");
  }


  loadUserFromLocal(): void {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
    console.log(this.user);
  }


  loadUser(): void {
    this.authService.getUserInfoForLikes(this.user?.id).subscribe(
      data => {
        this.userFire = data;
        this.length = this.userFire.liked.length;
        setTimeout(() => {
          this.userFavorites = this.userFire.liked;
          console.log('this.userFire', this.userFire);
        }, 1000)
      }, err => {
        console.log(err);
      }
    )
  }

  removeFromFavorites(product: IProduct): void {
    this.likesArr = this.userFire.liked.filter((el: any) => el.id !== product.id);
    console.log(this.likesArr)
    this.authService.updateUserLiked(this.user.id, this.likesArr)
      .then(() => {
        this.loadUser();
      })
      .catch(err => console.log(err))
    product.liked = false;
    this.productService.updateProduct(product, product.id)
      .then(() => {
        this.loadUser();
      })
    this.likesArr = [];
  }

}
