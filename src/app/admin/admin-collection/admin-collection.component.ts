import {Component, OnInit} from '@angular/core';
import {ICategory} from "../../shared/model/category/category.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../shared/services/category/category.service";
import {ToastrService} from "ngx-toastr";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {ICollection} from "../../shared/model/collection/collection.model";
import {CollectionService} from "../../shared/services/collection/collection.service";

@Component({
  selector: 'app-admin-collection',
  templateUrl: './admin-collection.component.html',
  styleUrls: ['./admin-collection.component.scss']
})

export class AdminCollectionComponent implements OnInit {

  public adminCollections: Array<ICollection> = [];
  public collectionForm!: FormGroup;
  private editCollectionID: string = "";
  public editStatus = false;

  constructor(
    private collectionService: CollectionService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private db: AngularFireDatabase
  ) {
  }

  ngOnInit(): void {
    this.initCollectionForm();
    this.loadCollections();
  }

  initCollectionForm(): void {
    //захардкоджені дані
    this.collectionForm = this.fb.group({
      name: ["FW20", Validators.required],
      path: ["fw20", Validators.required]
    })

    // норм код
    // this.categoryForm = this.fb.group({
    //   name: [null, Validators.required],
    //   path: [null, Validators.required]
    // })
  }

  loadCollections(): void {
    this.collectionService.getCollections().subscribe(
      data => {
        this.adminCollections = data;
      }, err => {
        console.log(err)
      }
    )
  }


  createCollection(): void {
    const newCollection = this.collectionForm.value;
    this.collectionService.pushCollection(newCollection)
      .then(() => this.loadCollections())
      .catch(err => console.log(err));
    this.initCollectionForm();
  }

  deleteCollection(collection: ICollection): void {
    this.collectionService.removeCollection(collection)
      .then(() => {
        this.loadCollections();
      });
  }

  editCollection(category: ICategory): void {
    this.collectionForm.patchValue({
      name: category.name,
      path: category.path
    });
    this.editCollectionID = category.id as string;
    this.editStatus = true;
  }

  updateCollection(): void {
    const collection = this.collectionForm.value;
    this.collectionService.updateCollection(collection, this.editCollectionID)
      .then(() => this.loadCollections())
      .catch(err => console.log(err));
    this.initCollectionForm();
    this.editStatus = false;
  }

}
