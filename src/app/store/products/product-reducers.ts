import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import {
  ADD_PRODUCT_FILTER,
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCTS_SUCCESS,
  REMOVE_PRODUCT_FILTER,
} from './product-actions';
import { IProductState } from './product-selectors';

export const initialState: IProductState = {
  products: [],
  filteredProducts: [],
  allFilters: [],
  activeFilters: [],
  loading: false,
  loaded: false,
  error: null,
};

const onLoadProducts = (state: IProductState): IProductState => {
  return {
    ...state,
    loading: true,
  };
};

const onLoadProductsSuccess = (
  state: IProductState,
  props: { products: any[] }
): IProductState => {
  return {
    ...state,
    products: props.products,
    filteredProducts: props.products,
    allFilters: Array.from(new Set(props.products.map((flt) => flt.category))),
    loading: false,
    loaded: true,
    error: null,
  };
};

const onLoadProductsFailure = (
  state: IProductState,
  props: { error: HttpErrorResponse }
): IProductState => {
  return {
    ...state,
    loading: false,
    loaded: true,
    error: props.error,
  };
};

const onAddProductFilter = (
  state: IProductState,
  props: { filter: string }
): IProductState => {
  const [filteredProducts, activeFilters] = getFilteredProducts(
    state,
    props,
    'add'
  );
  return {
    ...state,
    filteredProducts,
    activeFilters: activeFilters,
  };
};

const onRemoveProductFilter = (
  state: IProductState,
  props: { filter: string }
): IProductState => {
  const [filteredProducts, activeFilters] = getFilteredProducts(
    state,
    props,
    'remove'
  );
  return {
    ...state,
    filteredProducts,
    activeFilters,
  };
};

const getFilteredProducts = (
  state: IProductState,
  props: { filter: string },
  filterOperation: string
) => {
  let activeSet = new Set(state.activeFilters);
  if (filterOperation === 'add') {
    activeSet.add(props.filter);
  } else {
    activeSet.delete(props.filter);
  }
  const activeFilters = Array.from(activeSet);

  return [
    state.products.filter((product) => {
      if (activeFilters.length === 0) {
        return true;
      }
      return activeFilters.includes(product.category);
    }),
    activeFilters,
  ];
};

const _productReducer = createReducer(
  initialState,
  on(LOAD_PRODUCTS, onLoadProducts),
  on(LOAD_PRODUCTS_SUCCESS, onLoadProductsSuccess),
  on(LOAD_PRODUCTS_FAILURE, onLoadProductsFailure),
  on(ADD_PRODUCT_FILTER, onAddProductFilter),
  on(REMOVE_PRODUCT_FILTER, onRemoveProductFilter)
);

export function productReducer(state: IProductState, action: any) {
  return _productReducer(state, action);
}
