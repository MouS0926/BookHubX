import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { bookReducer } from './store/reducers/book.reducer';
import { BookEffects } from './store/effects/book.effects';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { userReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';
import { LoginComponent } from './components/login/login.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    BookDetailsComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    OrdersDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({books: bookReducer,user: userReducer ,book: bookReducer}),
    EffectsModule.forRoot([BookEffects,UserEffects]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
