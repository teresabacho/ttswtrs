import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
