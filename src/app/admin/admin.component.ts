import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  signOut(): void {
    this.auth.logOut();
  }

}
