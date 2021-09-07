import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../shared/services/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../shared/services/order/order.service";
import {IProduct} from "../../shared/model/product/product.model";

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

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initOrderForm();
  }

  changeBtnSize(): void {
    this.activeButton = !this.activeButton;
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      country: [null, Validators.required],
      city: [null, Validators.required],
      address: [null, Validators.required],
      apartment: [null, Validators.required],
      zipcode: [null, Validators.required],
      areaCode: ["UA +380", Validators.required],
      phone: [null, Validators.required],
      delivery: [null, Validators.required],
    })
  }

  addOrder(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(<string>localStorage.getItem('basket'));
      // this.totalPrice = this.getTotal(this.basket);
    }
    console.log(this.orderForm.value);
    const order = {
      ...this.orderForm.value,
      products: this.basket
    }
    console.log("order", order);
    this.orderService.pushOrderFirebase(order)
      .then(() => {
        this.basket = [];
        localStorage.removeItem('basket');
        this.orderService.changeBasket$.next(true);
      })
      .catch((err) => {
        console.log(err)
      })
  }


}
