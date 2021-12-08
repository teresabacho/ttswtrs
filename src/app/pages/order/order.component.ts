import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../shared/services/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../shared/services/order/order.service";
import {IProduct} from "../../shared/model/product/product.model";
import {AuthService} from "../../shared/services/auth/auth.service";
import {IOrder} from "../../shared/model/order/order.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orderForm!: FormGroup;
  public activeButton: boolean = false;
  public basket: Array<IProduct> = [];
  public selectedShipment: number = 0;

  public user: any;
  public userFire: any = {};
  public userOrders: Array<IOrder> = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.initOrderForm();
    this.loadUserFromLocal()
    this.loadUser();
  }

  changeBtnSize(): void {
    this.activeButton = !this.activeButton;
  }

  loadUser(): void {
    this.authService.getUserInfoForLikes(this.user?.id).subscribe(
      data => {
        this.userFire = data;
        setTimeout(() => {
          this.userOrders = this.userFire.orders;
        }, 1000)
      }, err => {
        console.log(err);
      }
    )
  }


  initOrderForm(): void {
    this.orderForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      country: [null, Validators.required],
      city: [null, Validators.required],
      address: [null, Validators.required],
      apartment: [null, Validators.required],
      zipcode: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required],
      delivery: [null, Validators.required],
    })
  }

  loadUserFromLocal(): void {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
    this.orderForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
    })
  }

  addOrder(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(<string>localStorage.getItem('basket'));
    }
    console.log(this.orderForm.value);
    const order = {
      ...this.orderForm.value,
      products: this.basket
    }
    console.log("order", order);
    this.userOrders.push(order);
    this.authService.updateUserOrders(this.user.id, this.userOrders)
      .then(() => {
        this.basket = [];
        localStorage.removeItem('basket');
        this.orderService.changeBasket$.next(true);
        this.initOrderForm();
      })
      .catch(err => console.log(err));
  }


}
