import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { Shop } from '../models/shop';


@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.scss']
})
export class CategoryAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formName: string;
  formShopCategoryId: string;
  formShopId: string;
  formShopName: string;

  categoryId: number;
  errorMessage: any;
  existingCategory: Category;

  shops$: Shop[] = [
    { Id: 1, name: 'Castorama', products: null},
    { Id: 2, name: 'OBI', products: null},
    { Id: 3, name: 'Leroy Merlin', products: null}
  ];

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formName = 'name';
    this.formShopId = 'shopId';
    this.formShopName = 'shopName';
    this.formShopCategoryId = 'shopCategoryId';
   
    
    if (this.avRoute.snapshot.params[idParam]) {
      this.categoryId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        categoryId: 0,
        name: ['', [Validators.required]],
        shopCategoryId: ['', [Validators.required]],
        shopId: [''],
        shopName: ['']
      }
    )
  }

  ngOnInit() {
    if (this.categoryId > 0) {
      this.actionType = 'Edit';
      this.categoryService.getCategory(this.categoryId)
        .subscribe(data => (
          this.existingCategory = data,
          this.form.controls[this.formName].setValue(data.name),
          this.form.controls[this.formShopCategoryId].setValue(data.shopCategoryId),
          this.form.controls[this.formShopId].setValue(data.shopId),
          this.form.controls[this.formShopName].setValue(data.shopName)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
    console.log("shopId", this.form.get(this.formShopId).value);

      return;
    }

    console.log("shopId", this.form.get(this.formShopId).value);

    if (this.actionType === 'Add') {
      let category: Category = {
        name: this.form.get(this.formName).value,
        shopCategoryId: this.form.get(this.formShopCategoryId).value,
        shopId: this.form.get(this.formShopId).value,
        shopName: this.form.get(this.formShopName).value,
      };

      this.categoryService.saveCategory(category)
        .subscribe((data) => {
          this.router.navigate(['/categories']);
        });
    }

    if (this.actionType === 'Edit') {
      let category: Category = {
        Id: this.existingCategory.Id,
        shopCategoryId: this.form.get(this.formShopCategoryId).value,
        name: this.form.get(this.formName).value,
        shopId: this.form.get(this.formShopId).value,
        shopName: this.form.get(this.formShopName).value
      };
      this.categoryService.updateCategory(category.Id, category)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/categories']);
  }

  get name() { return this.form.get(this.formName); }
  get shopCategoryId() { return this.form.get(this.formShopCategoryId); }
  get shopId() { return this.form.get(this.formShopId); }
  get shopName() { return this.form.get(this.formShopName); }

}
