import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductComponent, ProductModule } from "./product";

const routes: Routes = [
  { path: "", redirectTo: "pages", pathMatch: "full" },
  {
    path: "pages",
    component: PagesComponent,
    children: [
      {
        path: "",
        component: ProductComponent,
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "product",
        loadChildren: () =>
          import("./product/product.module").then((m) => m.ProductModule),
      },
    ],
  },
  { path: "**", redirectTo: "pages", pathMatch: "full" },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), ProductModule],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
