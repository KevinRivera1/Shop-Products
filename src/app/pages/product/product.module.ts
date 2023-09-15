import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormProductComponent } from "./formProduct/formProduct.component";
import { ProductComponent } from "./product.component";
import { ListProductComponent } from "./listProduct/listProduct.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: "", redirectTo: "pt", pathMatch: "full" },
  { path: "pt", component: ProductComponent },
  { path: "form", component: FormProductComponent },
  { path: "lt", component: ListProductComponent },
  { path: "**", redirectTo: "pt", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [],
  exports: [RouterModule],
})
export class ProductModule {}
