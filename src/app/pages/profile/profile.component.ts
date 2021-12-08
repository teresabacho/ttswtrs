import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {catchError} from "rxjs/operators";
import {logEvent} from "@angular/fire/analytics";
import {IOrder} from "../../shared/model/order/order.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile: any;
  public profileForm!: FormGroup;
  public activeButton: boolean = false;
  public userFire: any = {};
  public userOrders: Array<IOrder> = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.initProfileForm();
    this.loadProfile();
    this.loadUser();
  }

  changeSaveBtn(): void {
    this.activeButton = !this.activeButton;
  }

  initProfileForm(): void {
    this.profileForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null],
      phone: [null, Validators.required]
    })
  }

  loadProfile(): void {
    this.profile = JSON.parse(<string>localStorage.getItem('user'));
    this.profileForm.patchValue({
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      email: this.profile.email,
      phone: this.profile.phone
    })
    console.log('profile', this.profile)
  }

  loadUser(): void {
    this.authService.getUserInfoForLikes(this.profile?.id).subscribe(
      data => {
        this.userFire = data;
        setTimeout(() => {
          this.userOrders = this.userFire.orders;
          console.log('this.userFire', this.userFire);
        }, 1000)
      }, err => {
        console.log(err);
      }
    )
  }


  updateProfileInfo(): void {
    this.authService.updateUserInfo(this.profile.id, this.profileForm.value)
      .then(() => {
        this.updateLocalProfile(this.profile.id);
        this.toastr.success('User info updated');
      })
      .catch(err => {
        this.toastr.error(err.message);
      })
  }

  userSignOut(): void {
    this.authService.logOut();
  }

  updateLocalProfile(id: string): void {
    this.authService.getUserInfo(id)
      .then(doc => {
        if (doc.exists) {
          const user = {
            id: doc.id,
            ...doc.data() as any
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.loadProfile();
        }
      })
  }



}
