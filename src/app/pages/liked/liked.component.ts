import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss']
})
export class LikedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showDescription(id: number): void {
    document.getElementById(`${id}`)?.classList.remove("hidden");
    document.getElementById(`${id}`)?.classList.add("visible");
  }


  hideDescription(id: number): void {
    document.getElementById(`${id}`)?.classList.add("hidden");
    document.getElementById(`${id}`)?.classList.remove("visible");
  }

}
