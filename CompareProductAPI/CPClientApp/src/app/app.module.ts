import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';
import { ShopsComponent } from './shops/shops.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CategoriesComponent } from './categories/categories.component';
import { GetDataFromExternalComponent } from './get-data-from-external/get-data-from-external.component';
import { CategoryComponent } from './category/category.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';
import { AppSimulatorComponent } from './works-app/app-simulator/app-simulator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    ShopsComponent,
    NavMenuComponent,
    CategoriesComponent,
    GetDataFromExternalComponent,
    CategoryComponent,
    CategoryAddEditComponent,
    AppSimulatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
