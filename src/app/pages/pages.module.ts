import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CatalogueComponent } from "./catalogue/catalogue.component";
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";
import { ProductComponent } from "./product";
import { ProductModule } from "./product/product.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    CatalogueComponent,
    HomeComponent,
    ProductComponent,
    PagesComponent,
  ],
  exports: [
    CatalogueComponent,
    HomeComponent,
    ProductComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
