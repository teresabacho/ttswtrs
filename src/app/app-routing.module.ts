import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./pages/home/home.component";
import {ProductsComponent} from "./pages/products/products.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";
import {VipComponent} from "./pages/vip/vip.component";
import {AboutComponent} from "./pages/about/about.component";

import {LikedComponent} from "./pages/liked/liked.component";
import {LoginComponent} from "./pages/login/login.component";
import {BasketComponent} from "./pages/basket/basket.component";

import {ShipmentAndReturnComponent} from "./pages/shipment-and-return/shipment-and-return.component";
import {TermsOfUseComponent} from "./pages/terms-of-use/terms-of-use.component";
import {ShopsComponent} from "./pages/shops/shops.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products/:category', component: ProductsComponent},
  {path: 'products/:category/:id', component: ProductDetailsComponent},
  {path: 'vip', component: VipComponent},
  {path: 'about', component: AboutComponent},
  {path: 'liked', component: LikedComponent},
  {path: 'login', component: LoginComponent},
  {path: 'basket', component: BasketComponent},

  {path: 'shipmentAndReturn', component: ShipmentAndReturnComponent},
  {path: 'termsOfUse', component: TermsOfUseComponent},
  {path: 'shops', component: ShopsComponent},
  {path: 'contacts', component: ContactsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
