import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ADD_PRODUCT_FILTER,
  LOAD_PRODUCTS,
  REMOVE_PRODUCT_FILTER,
} from './store/products/product-actions';
import {
  IProductState,
  selectFilters,
  selectProductState,
} from './store/products/product-selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  productState$: Observable<any>;
  filterState$: Observable<string[]>;
  constructor(private store: Store<{ productState: IProductState }>) {
    this.productState$ = this.store.select(selectProductState);
    this.filterState$ = this.store.select(selectFilters);
  }

  ngOnInit() {
    this.store.dispatch(LOAD_PRODUCTS());
  }

  filterByCategory($event, category: string) {
    if ($event.target.checked) {
      this.store.dispatch(ADD_PRODUCT_FILTER({ filter: category }));
    } else {
      this.store.dispatch(REMOVE_PRODUCT_FILTER({ filter: category }));
    }
  }
}
