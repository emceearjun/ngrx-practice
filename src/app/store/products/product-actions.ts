import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const LOAD_PRODUCTS = createAction("LOAD_PRODUCTS");
export const LOAD_PRODUCTS_SUCCESS = createAction("LOAD_PRODUCTS_SUCCESS", props<{ products: any[] }>());
export const LOAD_PRODUCTS_FAILURE = createAction("LOAD_PRODUCTS_FAILURE", props<{ error: HttpErrorResponse }>());

export const ADD_PRODUCT_FILTER = createAction("ADD_PRODUCT_FILTER", props<{ filter: string }>());
export const REMOVE_PRODUCT_FILTER = createAction("REMOVE_PRODUCT_FILTER", props<{ filter: string }>());