import { HttpErrorResponse } from '@angular/common/http';
import { createSelector } from '@ngrx/store';

export interface IAppState {
  productState: IProductState;
}

export interface IProductState {
  products: any[];
  loading: boolean;
  loaded: boolean;
  error: HttpErrorResponse;
  allFilters: any[];
  activeFilters: any[];
  filteredProducts: any[];
}

export const selectProductState = (state: IAppState) => state.productState;

export const selectProducts = createSelector(
  selectProductState,
  (state: IProductState) => state.products
);

export const selectFilters = createSelector(
  selectProductState,
  (state: IProductState) => state.activeFilters
);
