import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }

  showDescription(id: number): void {
    document.getElementById(`${id}`)?.classList.remove("hidden");
    document.getElementById(`${id}`)?.classList.add("visible");

    // document.querySelector(".descriptionContainerBottom")?.classList.remove("hidden");
    // document.querySelector(".descriptionContainerBottom")?.classList.add("visible");
  }


  hideDescription(id: number): void {
    document.getElementById(`${id}`)?.classList.add("hidden");
    document.getElementById(`${id}`)?.classList.remove("visible");

    // document.querySelector(".descriptionContainerTop")?.classList.add("hidden");
    // document.querySelector(".descriptionContainerTop")?.classList.remove("visible");
    //
    // document.querySelector(".descriptionContainerBottom")?.classList.add("hidden");
    // document.querySelector(".descriptionContainerBottom")?.classList.remove("visible");
  }

}
