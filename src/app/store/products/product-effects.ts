import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE,
} from './product-actions';

@Injectable({
  providedIn: 'root',
})
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_PRODUCTS),
      mergeMap(() => {
        return this.productsService.getProducts().pipe(
          map((products: any) => {
            return LOAD_PRODUCTS_SUCCESS({ products });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(LOAD_PRODUCTS_FAILURE({ error }));
          })
        );
      })
    );
  });
}
