import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShopsComponent } from './shops/shops.component';
import { GetDataFromExternalComponent } from './get-data-from-external/get-data-from-external.component';
import { CategoryComponent } from './category/category.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shops', component: ShopsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'categoryadd', component: CategoryAddEditComponent },
  { path: 'category/edit/:id', component: CategoryAddEditComponent },
  { path: 'getdatafromexternal', component: GetDataFromExternalComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
