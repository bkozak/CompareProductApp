import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category$: Observable<Category>;
  categoryId: number;

  constructor(private categoryService: CategoryService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.categoryId = this.avRoute.snapshot.params[idParam];
    }
   }

  ngOnInit() {
    this.loadCategory();
  }

  loadCategory() {
    this.category$ = this.categoryService.getCategory(this.categoryId);
  }

}
