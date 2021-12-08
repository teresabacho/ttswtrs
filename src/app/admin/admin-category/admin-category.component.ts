import {Component, OnInit} from '@angular/core';
import {ICategory} from "../../shared/model/category/category.model";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable} from "rxjs";
import {IProduct} from "../../shared/model/product/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../shared/services/category/category.service";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories: Array<ICategory> = [];
  public categoryForm!: FormGroup;
  private editCategoryID: string = "";
  public editStatus = false;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private db: AngularFireDatabase
  ) {
  }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  initCategoryForm(): void {
    //захардкоджені дані
    this.categoryForm = this.fb.group({
      name: ["Dress", Validators.required],
      path: ["dress", Validators.required]
    })

    // норм код
    // this.categoryForm = this.fb.group({
    //   name: [null, Validators.required],
    //   path: [null, Validators.required]
    // })
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.adminCategories = data;
        console.log("this.adminCategories", this.adminCategories);
      }, err => {
        console.log(err)
      }
    )
    console.log("admin-categories.ts/loadCat", this.adminCategories);
  }

  createCategory(): void {
    const newCategory = this.categoryForm.value;
    this.categoryService.pushCategory(newCategory)
      .then(() => this.loadCategories())
      .catch(err => console.log(err));
    this.initCategoryForm();
  }

  deleteCategory(category: ICategory): void {
    this.categoryService.removeCategory(category)
      .then(() => {
        this.loadCategories();
      });
  }

  editCategory(category: ICategory): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path
    });
    this.editCategoryID = category.id as string;
    console.log('this.editCategoryID', this.editCategoryID)
    this.editStatus = true;
  }

  updateCategory(): void {
    const category = this.categoryForm.value;
    this.categoryService.updateCategory(category, this.editCategoryID)
      .then(() => this.loadCategories())
      .catch(err => console.log(err));

    this.initCategoryForm();
    this.editStatus = false;
  }

}
