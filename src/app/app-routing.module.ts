import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./pages/home/home.component";
import {ProductsComponent} from "./pages/products/products.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";
import {VipComponent} from "./pages/vip/vip.component";
import {AboutComponent} from "./pages/about/about.component";

import {FavoritesComponent} from "./pages/favorites/favorites.component";
import {LoginComponent} from "./pages/login/login.component";
import {BasketComponent} from "./pages/basket/basket.component";
import {OrderComponent} from "./pages/order/order.component";

import {ShipmentAndReturnComponent} from "./pages/shipment-and-return/shipment-and-return.component";
import {TermsOfUseComponent} from "./pages/terms-of-use/terms-of-use.component";
import {ShopsComponent} from "./pages/shops/shops.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";

import {AdminComponent} from './admin/admin.component';
import {AdminCollectionComponent} from './admin/admin-collection/admin-collection.component';
import {AdminCategoryComponent} from './admin/admin-category/admin-category.component';
import {AdminProductComponent} from './admin/admin-product/admin-product.component';
import {AdminOrderComponent} from './admin/admin-order/admin-order.component';
import {AdminGuard} from "./shared/guards/admin/admin.guard";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ProfileGuard} from "./shared/guards/profile/profile.guard";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products/:categoryOrCollection/:name', component: ProductsComponent},
  {path: 'products/:categoryOrCollection/:name/:id', component: ProductDetailsComponent},
  {path: 'vip', component: VipComponent},
  {path: 'about', component: AboutComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: ProfileComponent, canActivate:[ProfileGuard]},
  {path: 'basket', component: BasketComponent},
  {path: 'order', component: OrderComponent},

  {path: 'shipmentAndReturn', component: ShipmentAndReturnComponent},
  {path: 'termsOfUse', component: TermsOfUseComponent},
  {path: 'shops', component: ShopsComponent},
  {path: 'contacts', component: ContactsComponent},

  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      {path: '', pathMatch: 'full', redirectTo: 'collection'},
      {path: 'collection', component: AdminCollectionComponent},
      {path: 'category', component: AdminCategoryComponent},
      {path: 'product', component: AdminProductComponent},
      {path: 'order', component: AdminOrderComponent},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
