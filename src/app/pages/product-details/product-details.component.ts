import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../shared/services/order/order.service";
import {IProduct} from "../../shared/model/product/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public user: any;
  public userFire: any = {};
  public asideIsOpen: boolean = false;
  public activeButton: boolean = false;
  public selectedSize: Array<string> = [];
  public product!: IProduct;
  public sizeForm!: FormGroup;
  public productSize: Array<string> = [];
  public liked: boolean = false;
  public likesArr: Array<IProduct> = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private auth: AngularFireAuth,
  ) {
  }

  ngOnInit(): void {
    this.initSizeForm();
    this.loadProduct();
    this.loadUserFromLocal();
    this.loadUser();
  }

  changeBtnSize(): void {
    this.activeButton = !this.activeButton;
  }

  moreDetailsOpen(): void {
    this.asideIsOpen = !this.asideIsOpen
  }

  moreDetailsClose(): void {
    this.asideIsOpen = false;
  }

  initSizeForm(): void {
    this.sizeForm = this.fb.group({
      size: ['', Validators.required]
    })
  }

  loadProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getOneProduct(id).subscribe(
      data => {
        this.product = data;
        if (id != null) {
          this.product.id = id;
        }
        this.productSize = data.size;
      }, err => {
        console.log(err);
      }
    )
  }


  addToBasket(product: IProduct): void {
    this.selectedSize = Object.values(this.sizeForm.value);
    console.log("this.selectedSize", this.selectedSize)
    product.size = this.selectedSize;
    this.orderService.addToBasket(product);
    this.initSizeForm();
  }

  loadUserFromLocal(): void {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
  }


  loadUser(): void {
    this.authService.getUserInfoForLikes(this.user.id).subscribe(
      data => {
        this.userFire = data;
        // console.log('this.userFire', this.userFire)
      }, err => {
        console.log(err);
      }
    )
  }

  addToFavorites(product: IProduct): void {
    if (localStorage.getItem('user')) {
      if (this.userFire.liked.length !== 0) {
        this.likesArr = this.userFire.liked.filter((el: any) => el.id !== product.id);
        console.log(this.likesArr);
        this.likesArr.push(product);
      } else {
        this.likesArr.push(product);
      }
      this.authService.updateUserLiked(this.user.id, this.likesArr)
        .then(() => {
          this.loadUser();
        })
        .catch(err => console.log(err))
      this.product.liked = true;
      this.productService.updateProduct(this.product, this.product.id)
        .then(() => {
          this.loadProduct();
        })
      this.likesArr = [];
    } else {
      alert("You are not authorized!");
    }
  }

  removeFromFavorites(product: IProduct): void{
    this.likesArr = this.userFire.liked.filter((el: any) => el.id !== product.id);
    console.log(this.likesArr)
    this.authService.updateUserLiked(this.user.id, this.likesArr)
      .then(() => {
        this.loadUser();
      })
      .catch(err => console.log(err))
    this.product.liked = false;
    this.productService.updateProduct(this.product, this.product.id)
      .then(() => {
        this.loadProduct();
      })
    this.likesArr = [];
  }

  updateLocalUser(id: string): void {
    this.authService.getUserInfo(id)
      .then(doc => {
        if (doc.exists) {
          const user = {
            id: doc.id,
            ...doc.data() as any
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.loadUserFromLocal();
          console.log("user", this.user)
        }
      })
  }
}
