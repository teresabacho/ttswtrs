import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { VipComponent } from './pages/vip/vip.component';
import { BasketComponent } from './pages/basket/basket.component';
import { LoginComponent } from './pages/login/login.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ShipmentAndReturnComponent } from './pages/shipment-and-return/shipment-and-return.component';
import { TermsOfUseComponent } from './pages/terms-of-use/terms-of-use.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCollectionComponent } from './admin/admin-collection/admin-collection.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';

import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../environments/environment";
import { OrderComponent } from './pages/order/order.component';
import { ProfileComponent } from './pages/profile/profile.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    VipComponent,
    BasketComponent,
    LoginComponent,
    FavoritesComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ShipmentAndReturnComponent,
    TermsOfUseComponent,
    ShopsComponent,
    ContactsComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrderComponent,
    AdminCollectionComponent,
    OrderComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
