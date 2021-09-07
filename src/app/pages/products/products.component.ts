import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product/product.service";
import {IProduct} from "../../shared/model/product/product.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {OrderService} from "../../shared/services/order/order.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public userProducts: Array<IProduct> = [];

  products: Array<IProduct> = [];
  currentCategory: string = '';

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
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

  ngOnInit(): void {
    // this.loadProducts();
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


  loadIDs(): void {
    setTimeout(() => {
      this.productService.getProductsFirebase().subscribe(
        data => {
          let idDt = data.map((e: { key: { value: any; }; }) => e.key)
          console.log(idDt)
          this.userProducts.map((e, i) => {
            e.id = idDt[i]
          })
        },
        err => {
          console.log(err)
        }
      )
    }, 1500)
  }

  loadProducts(): void {
    this.loadIDs();
    this.productService.getProductsFirebaseData().subscribe(
      data => {
        this.userProducts = data;
        console.log("this.userProducts", this.userProducts);
      }, err => {
        console.log(err)
      }
    )
  }


  loadProductsByCategory(categoryName: string): void {
    this.loadIDs();
    this.productService.getByCategory(categoryName as string).subscribe(
      data => {
        this.userProducts = data.filter((item: { category: { path: string; }; }) => item.category.path === categoryName);
        console.log("this.userProducts", this.userProducts);
      }, err => {
        console.log(err)
      }
    )
  }

  loadProductsByCollection(collectionName: string): void {
    this.loadIDs();
    this.productService.getByCategory(collectionName as string).subscribe(
      data => {
        this.userProducts = data.filter((item: { collection: { path: string; }; }) => item.collection.path === collectionName);
        console.log("this.userProducts", this.userProducts);
      }, err => {
        console.log(err)
      }
    )
  }
  check(text:any):any{
    console.log(text)
  }


}
