import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from 'rxjs';
import { CreateProductDto, ProductModel, UpdateProductDto } from "src/app/models/ProductModel";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() productos!: CreateProductDto;

  products: ProductModel[] = [];
  selectedProduct!: UpdateProductDto;

  productForm!: FormGroup;
  response: any;


  initialFormState: any;
  constructor(private formBuilder: FormBuilder, private productService: ProductsService) { }

  ngOnInit() {
    this.IniciarForm();
    this.obtenerProductos();
  }

  get f() {
    return this.productForm.controls;
  }


  IniciarForm() {
    this.productForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      category: [''],
      images: [[]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]]
    });
  }


  async obtenerProductos() {
    try {
      const res = await firstValueFrom(this.productService.getAllProducts());
      this.products = res;
    } catch (err) {
      console.log(err);
    }
  }


  saveProduct() {
    if (this.productForm.invalid) {
      // Manejo de errores de validación
      console.error("El formulario es inválido.");
      return;
    }

    const formData: CreateProductDto = this.productForm.value;
    formData.categoryId = 1;


    if (!Array.isArray(formData.images)) {
      formData.images = [];
    }

    // Obtén la cadena de texto de imágenes desde el formulario
    const imagesString: string = this.productForm.controls['images'].value;

    // Divide la cadena por comas y elimina los espacios en blanco alrededor de cada URL
    const imagesArray: string[] = imagesString.split(',').map(url => url.trim());

    // Ahora, imagesArray es un array de URLs válidas que puedes enviar al servidor
    console.log("Imágenes válidas:", imagesArray);

    // Asegúrate de que el campo "images" en formData sea el array
    formData.images = imagesArray;

    console.log("Formulario de datos:", formData);

    console.log("Imágenes válidas:", formData.images);

    if (this.selectedProduct) {
      // Si existe un producto seleccionado, significa que estamos editando
      if (this.selectedProduct.id !== undefined) {
        // Verifica si el registro ya existe en la base de datos por su ID
        console.log("ID del producto seleccionado:", this.selectedProduct.id);

        this.productService.getProductById(this.selectedProduct.id).subscribe(
          (existingProduct) => {
            console.log("Producto existente:", existingProduct);

            if (existingProduct && this.selectedProduct.id !== undefined) {
              // El registro ya existe, realiza la actualización
              console.log("Actualizando producto existente...");

              this.productService.updateProduct(this.selectedProduct.id, formData).subscribe({
                next: (data) => {
                  this.response = data;
                  console.log('Producto actualizado correctamente:', this.response);
                  
                  this.IniciarForm();
                  this.resetProductForm();
                },
                error: (error) => {
                  console.error("Error al actualizar el producto:", error);
                  // Maneja el error y proporciona retroalimentación adecuada al usuario
                },
                complete: () => {
                  this.IniciarForm();
                  this.resetProductForm();
                  return;
                  // Realiza acciones de limpieza o redirección si es necesario
                }
              });
            } else {
              // El registro no existe, muestra un mensaje al usuario o maneja la situación
              console.error("El producto seleccionado no existe en la base de datos.");
              // Maneja el error y proporciona retroalimentación adecuada al usuario
            }
          },
          (error) => {
            console.error("Error al verificar la existencia del producto:", error);
            // Maneja el error y proporciona retroalimentación adecuada al usuario
          }
        );
      } else {
        console.error("El producto seleccionado no tiene un ID válido.");
        // Maneja el error y proporciona retroalimentación adecuada al usuario
      }
    } else {
      console.log("Creando nuevo producto...");

      this.productService.createProduct(formData).subscribe({
        next: (data) => {
          this.response = data;
          console.log('Producto creado correctamente:', this.response);
          this.productForm.reset();
          this.obtenerProductos();
          // Realiza acciones adicionales si es necesario
        },
        error: (error) => {
          console.error("Error al crear el producto:", error);
          // Maneja el error y proporciona retroalimentación adecuada al usuario
        },
        complete: () => {
          this.productForm.reset();
          this.obtenerProductos();
          return;
          // Realiza acciones de limpieza o redirección si es necesario
        }
      });
    }
  }



  resetProductForm() {
    const formValues = {
      id: null,
      title: '',
      price: null, // O el valor inicial adecuado para el campo price
      description: '',
      //images: ['https://i.ibb.co/SyQ3Szg/zeynep-sumer-lk3-F07-BN8-T8-unsplash.jpg'],
      images: [[]],
      category: ''
    };

    this.productForm.reset(formValues);
  }

  editProduct(product: UpdateProductDto) {
    // Asigna el producto seleccionado a la propiedad selectedProduct
    this.selectedProduct = product;

    // Crea un objeto que contiene los valores del formulario
    const formValues = {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      images: Array.isArray(product.images) ? product.images.join(', ') : '',
      category: product.category
    };

    // Establece los valores en el formulario
    this.productForm.setValue(formValues);
  }


  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (res: any) => {
        console.log(res);
        this.obtenerProductos();
      },
      (err: any) => {
        console.log(err);
      }
    );
    console.log("delete product");
  }

  setearForm() {
    this.productForm.reset();
    this.IniciarForm();
  }

}
