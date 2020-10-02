import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/service/product.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {

  public products:Product[];
  private sub:Subscription;

  constructor(public productService:ProductService) { }

  delete(product:Product):void{
    this.productService.delete(product.proId).subscribe(ok=>{
      // this.showMsg=true;
      // this.messages=[""];
      // this.messages[0]="El customer se borro con exito";
      this.findAll();
      swal.fire('Product deleted', `the product has been deleted successfully`, 'success');
    },err=>{
      // this.showMsg=true;
      // this.messages=err.error.error;
    });
  }

  findAll():void{
    this.sub=this.productService.findAll().subscribe(data=>{
      this.products=data;
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  ngOnDestroy():void{
    console.log('ngOnDestroy');
    this.sub.unsubscribe();
  }

}
