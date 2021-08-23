import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  selectASize(): void {
    // if(document.querySelector(".addToBasketBtn")?.disabled){
    document.querySelector(".buttonBuyPrice")?.classList.add("hidden");
    document.querySelector(".buttonBuyPrice")?.classList.add("displayNone");
    document.querySelector(".buttonBuyPrice")?.classList.remove("visible");
    document.querySelector(".buttonBuyPrice")?.classList.remove("displayFlex");

    document.querySelector(".selectASize")?.classList.remove("hidden");
    document.querySelector(".selectASize")?.classList.remove("displayFlex");
    document.querySelector(".selectASize")?.classList.add("visible");
    document.querySelector(".selectASize")?.classList.add("displayNone");
    // }
  }


  moreDetailsOpen():void{
    document.querySelector("aside")?.classList.remove("displayNone");
    document.querySelector(".grey")?.classList.remove("displayNone");
  }

  moreDetailsClose():void{
    document.querySelector("aside")?.classList.add("displayNone");
    document.querySelector(".grey")?.classList.add("displayNone");
  }
}
