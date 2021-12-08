import {Component, NgIterable, OnInit} from '@angular/core';
import {IProduct} from "../../shared/model/product/product.model";
import {ProductService} from "../../shared/services/product/product.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {splitAtColon} from "@angular/compiler/src/util";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {ICategory} from "../../shared/model/category/category.model";
import {CategoryService} from "../../shared/services/category/category.service";
import {CollectionService} from "../../shared/services/collection/collection.service";
import {ICollection} from "../../shared/model/collection/collection.model";
import {logEvent} from "@angular/fire/analytics";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public adminProducts: Array<IProduct> = [];
  public adminCategories: Array<ICategory> = [];
  public adminCollections: Array<ICollection> = [];
  public productForm!: FormGroup;
  private editProductID = "";
  public editStatus: boolean = false;
  public uploadPercent: Observable<number> | undefined;
  public images: Array<string> = [];
  public image: string = '';
  public imageStatus: boolean = false;
  public submitted = false;
  public imagesForm!: FormGroup

  public customImage: Array<string> = [
    "https://cdn.shopify.com/s/files/1/0474/2997/6230/products/ttswtrs_bdffa4cf-48f2-450d-b4de-860bdf132edd_1600x.jpg?v=1628803389",
    "https://cdn.shopify.com/s/files/1/0474/2997/6230/products/eba346b7fa051904ae33db79accb877e_1600x.jpg?v=1629106317"
  ]
  private numberOfTickets?: number;


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private collectionService: CollectionService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {
  }


  ngOnInit(): void {
    this.initProductsForm();
    this.loadCollections();
    this.loadCategories();
    this.loadProducts();
  }


  initProductsForm(): void {
    // захардкоджені дані
    // this.productForm = this.formBuilder.group({
    //   collection: ["Select category", Validators.required],
    //   category: ["Select category", Validators.required],
    //   name: ["New name", Validators.required],
    //   ref: ["WGH_FY", Validators.required],
    //   price: [200, Validators.required],
    //   color: ["white", Validators.required],
    //   size: ["s,m", Validators.required],
    //   composition: ["90% cotton,10% elastan", Validators.required],
    //   modelHeight: [170, Validators.required],
    //   modelSize: ["s", Validators.required],
    //   liked: [false],
    //
    //   numberOfImages: ["", Validators.required],
    //   imagesContainer: new FormArray([])
    // })

    // правильний код
    this.productForm = this.formBuilder.group({
      collection: [null, Validators.required],
      category: [null, Validators.required],
      name: [null, Validators.required],
      ref: [null, Validators.required],
      price: [null, Validators.required],
      color: [null, Validators.required],
      size: [null, Validators.required],
      composition: [null, Validators.required],
      modelHeight: [null, Validators.required],
      modelSize: [null, Validators.required],
    liked: [false]
    })
  }

  // get f() {
  //   return this.productForm.controls;
  // }

  // get t() {
  //   return this.productForm.get('imagesContainer') as FormArray
  // }

  // get t() { return this.f.imagesContainer as FormArray; }


  // onChangeImg(e: any) {
  //   const numberOfImages = e.target.value || 0;
  //   console.log(this.t)
  //   if (this.t.length < numberOfImages) {
  //     for (let i = this.t.length; i < numberOfImages; i++) {
  //       this.t.push(this.formBuilder.group({
  //         imageItem: [""]
  //       }));
  //     }
  //   } else {
  //     for (let i = this.t.length; i >= numberOfImages; i--) {
  //       this.t.removeAt(i);
  //     }
  //   }
  // }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.adminProducts = data;
      }, err => {
        console.log(err)
      }
    )
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

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.adminCategories = data;
      }, err => {
        console.log(err)
      }
    )
  }


  createProduct(): void {
    const newProduct = this.productForm.value;
    newProduct.composition = newProduct.composition.split(",");
    newProduct.size = newProduct.size.split(",");
    newProduct.images = this.images;

    this.productService.pushProduct(newProduct)
      .then(() => this.loadProducts())
      .catch(err => console.log(err))

    this.initProductsForm();
    this.imageStatus = false;
    this.images = []
  }


  deleteProduct(product: IProduct): void {
    this.productService.removeProduct(product)
      .then(() => {
        this.loadCategories();
      });
  }


  editProduct(product: IProduct): void {
    this.productForm.patchValue({
      collection: product.collection,
      category: product.category,
      name: product.name,
      ref: product.ref,
      price: product.price,
      color: product.color,
      size: product.size.toString(),
      composition: product.composition.toString(),
      modelHeight: product.modelHeight,
      modelSize: product.modelSize,
      images: product.images
    });
    this.editProductID = product.id as string;
    this.editStatus = true;
  }

  updateProduct(): void {
    const product = this.productForm.value;
    product.composition = product.composition.split(", ");
    product.size = product.size.split(", ");
    product.images = this.images;
    this.productService.updateProduct(product, this.editProductID)
      .then(() => this.loadProducts())
      .catch(err => console.log(err));
    this.initProductsForm();
    this.editStatus = false;
  }


  uploadFile(event: any): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges() as Observable<number>;
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.image = url;
        this.images.push(this.image)
        this.productForm.patchValue({
          images: this.images
        })
        this.imageStatus = true;
      });
    });
  }

  deleteFile(product?: IProduct): void {
    const pathImage = product?.images[0] || this.images[0];
    this.storage.storage.refFromURL(pathImage).delete().then(
      () => {
        console.log('Image deleted!');
        this.images[0] = '';
        this.imageStatus = false;
      }
    ).catch(err => console.log(err));
  }

}




