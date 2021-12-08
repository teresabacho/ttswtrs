import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../shared/services/order/order.service";
import {IProduct} from "../../shared/model/product/product.model";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  public empty: boolean = false;
  public oneProduct: boolean = false;

  public basket: Array<IProduct> = [];
  public totalPrice = 0;

  constructor(private orderService: OrderService,) {
  }

  ngOnInit(): void {

    this.getLocalProducts();
  }

  private getLocalProducts(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(<string>localStorage.getItem('basket'));
      if (this.basket.length === 1) {
        this.oneProduct = true;
      } else if (this.basket.length === 0) {
        this.empty = true;
      }
      this.totalPrice = this.getTotal(this.basket);
    } else {
      this.empty = true;
    }
    console.log(this.basket);
  }

  private getTotal(products: Array<IProduct>): number {
    return products.reduce((total, prod) => total + Number(prod.price), 0);
  }

  removeProduct(product: IProduct): void {
    if (confirm('Are you sure?')) {
      const index = this.basket.findIndex(prod => prod.id === product.id);
      this.basket.splice(index, 1);
      this.totalPrice = this.getTotal(this.basket);
      localStorage.setItem('basket', JSON.stringify(this.basket))
      this.orderService.changeBasket$.next(true);
    }

  }
}
