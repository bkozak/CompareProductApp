import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  public categories: Category[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

  delete(categoryId) {
    const ans = confirm('Do you want to delete blog post with id: ' + categoryId);
    if (ans) {
      this.categoryService.deleteCategory(categoryId).subscribe((data) => {
        this.loadCategories();
      });
    }
  }
}
