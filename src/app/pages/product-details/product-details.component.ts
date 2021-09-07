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
  public asideIsOpen: boolean = false;
  public activeButton: boolean = false;
  public selectedSize: Array<string> = [];
  public product!: IProduct;
  public sizeForm!: FormGroup;
  public productSize: Array<string> = [];
  public liked: boolean = false;

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

  // loadIDs(): void {
  //   setTimeout(() => {
  //     this.productService.getProductsFirebase().subscribe(
  //       data => {
  //         let idDt = data.map((e: { key: { value: any; }; }) => e.key)
  //         console.log(idDt)
  //         this.userProducts.map((e, i) => {
  //           e.id = idDt[i]
  //         })
  //       },
  //       err => {
  //         console.log(err)
  //       }
  //     )
  //   }, 1000)
  // }


  loadProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("id", id)
    this.productService.getByID(id).subscribe(
      data => {
        this.product = data;
        if (id != null) {
          this.product.id = id;
        }
        this.productSize = data.size;
        console.log(this.productSize)
        console.log("product", this.product)
      }, err => {
        console.log(err);
      }
    )
  }


  addToBasket(product: IProduct): void {
    this.selectedSize = Object.values(this.sizeForm.value);
    console.log(this.selectedSize)
    product.size = this.selectedSize;
    console.log("product", product);
    this.orderService.addToBasket(product);
    this.initSizeForm();
  }

  loadUser(): void {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
  }

  addToFavorites(product: IProduct): void {
    // let user = JSON.parse(<string>localStorage.getItem('user'));
    // const currentLiked = {liked:};
    // this.user = JSON.parse(<string>localStorage.getItem('user'));
    let liked: Array<IProduct> = [];
    liked.push(product);



    let obj = {
      liked: liked
    }

    if (localStorage.getItem('user')) {
      console.log(JSON.parse(<string>localStorage.getItem('user')).liked.length)

      // if (this.user.liked.length !== 0) {
      //   console.log("have likes");
      //
      // } else {
        // this.user.obj;
      // }

        console.log(obj)
        this.authService.updateUserLiked(this.user.id, obj)
          .then(() => {
            this.updateLocalUser(this.user.id);
          });
        console.log("dont have likes");



      this.liked = true;
    } else {
      alert("You are not authorized!");
    }
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
          this.loadUser();
          console.log("user", this.user)
        }
      })
  }
}
