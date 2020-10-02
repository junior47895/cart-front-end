import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductSaveComponent } from './product/product-save/product-save.component';
const routes: Routes = [
  {path:'customer-list',component:CustomerListComponent},
  {path:'customer-save',component:CustomerSaveComponent},
  {path:'customer-edit/:email',component:CustomerEditComponent},

  {path:'product-list',component:ProductListComponent},
  {path:'product-save',component:ProductSaveComponent},
  {path:'product-edit/:proId',component:ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
