import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './Components/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ProductComponent } from './Components/product/product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { HomeMainSliderComponent } from './Components/home-main-slider/home-main-slider.component';
import { HomeCategoriesSliderComponent } from './Components/home-categories-slider/home-categories-slider.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { ShippingAddressComponent } from './Components/shipping-address/shipping-address.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { AddEGPPipe } from './Pipes/add-egp.pipe';
import { TitleSlicePipe } from './Pipes/title-slice.pipe';
import { SearchPipe } from './Pipes/search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CategoryProductsComponent } from './Components/category-products/category-products.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    CartComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    ForgetPasswordComponent,
    VerifyResetCodeComponent,
    ResetPasswordComponent,
    ProductComponent,
    ProductDetailsComponent,
    HomeMainSliderComponent,
    HomeCategoriesSliderComponent,
    ShippingAddressComponent,
    OrdersComponent,
    AddEGPPipe,
    TitleSlicePipe,
    SearchPipe,
    CategoryProductsComponent,
    LoadingComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
