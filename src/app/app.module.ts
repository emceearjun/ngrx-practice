import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/products/product-reducers';
import { EffectsModule } from '@ngrx/effects';

import { ProductEffects } from './store/products/product-effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ productState: productReducer }),
    EffectsModule.forRoot([ProductEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
