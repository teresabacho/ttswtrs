import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../shared/services/product/product.service";
import {OrderService} from "../../shared/services/order/order.service";
import {IProduct} from "../../shared/model/product/product.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public registerForm!: FormGroup;
  public loginForm!: FormGroup;
  public formChecker = true;
  public activeButton: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private db: AngularFirestore,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
  }


  changeBtnSize(): void {
    this.activeButton = !this.activeButton;
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      email: [null, Validators.required],
      // firstname: [null, Validators.required],
      // lastname: [null, Validators.required],
      password: [null, Validators.required],
      // confirmPassword: [null, Validators.required]
    })
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  register(): void {
    const {email, password} = this.registerForm.value;
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log(userCredential);
        const user = {
          email: userCredential.user?.email,
          firstName: '',
          lastName: '',
          phone: '',
          address: [],
          orders: [],
          liked: [],
          role: 'USER'
        };
        this.db.collection('users').doc(userCredential.user?.uid).set(user)
          .then(() => {
            this.toastr.success('User register successfully', '');
            this.registerForm.reset();
            this.formChecker = !this.formChecker;
          })
          .catch(err => {
            this.toastr.error(err.message, err.title);
          })
      })
      .catch(err => {
        console.log(err);
        this.toastr.error(err.message, err.title);
      })
  }

  login(): void {
    const {email, password} = this.loginForm.value;
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        this.db.collection('users').doc(userCredential.user?.uid).ref.get()
          .then(doc => {
            if (doc.exists) {
              const user = {
                id: doc.id,
                ...doc.data() as any
              };
              localStorage.setItem('user', JSON.stringify(user));
              if (user.role === "USER") {
                this.router.navigateByUrl('account')
              } else if (user.role === "ADMIN") {
                this.router.navigateByUrl('admin');
              }
              this.authService.loginStatus.next(true);
              this.toastr.success(`Welcome user`);
              this.registerForm.reset();
            }
          })
      })
      .catch(err => {
        this.toastr.error(err.message, err.title);
      })
  }


  switchForm(): void {
    this.formChecker = !this.formChecker;
  }


}
