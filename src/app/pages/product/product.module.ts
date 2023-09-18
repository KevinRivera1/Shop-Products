import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FormProductComponent } from "./formProduct/formProduct.component";
import { ListProductComponent } from "./listProduct/listProduct.component";
import { ProductComponent } from ".";
import { ProductsService } from "src/app";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: ProductComponent,
    children: [
      { path: "form", component: FormProductComponent },
      { path: "list", component: ListProductComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [FormProductComponent, ListProductComponent],
  exports: [RouterModule, FormProductComponent, ListProductComponent],
})
export class ProductModule {}
