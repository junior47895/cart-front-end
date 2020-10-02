import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/domain/product';
import { Enable } from 'src/app/domain/enable';
import { ProductService } from 'src/app/service/product.service';
import { EnableService } from 'src/app/service/enable.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public product:Product;
  public enables:Enable[];

  public showMsg:boolean=false;
  public messages:string[]=[""];

  constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public productService:ProductService,
              public enableService:EnableService) { }

  ngOnInit(): void {
    let params=this.activatedRoute.params['_value'];
    let proId=params.proId;
    this.findById(proId);
    this.enables=this.enableService.findAll();
  }

  findById(proId:string):void{
    this.productService.findById(proId).subscribe(data=>{
      this.product=data;
    });
  }

  update():void{
    this.productService.update(this.product).subscribe(ok=>{
      this.showMsg=true;
      this.messages=[""];
      this.messages[0]="El customer se modifico con exito";
      this.router.navigate(['/product-list']);
      swal.fire('Product updated', `the product has been updated successfully`, 'success');
    },err=>{
      this.showMsg=false;
      this.messages=err.error.error;
      swal.fire({icon: 'error',title : 'Product no updated', text: `${this.messages}`});
    });
  }

  delete():void{
    this.productService.delete(this.product.proId).subscribe(ok=>{
      this.showMsg=true;
      this.messages=[""];
      this.messages[0]="El customer se borro con exito";
      this.router.navigate(['/product-list']);
      swal.fire('Product deleted', `the product has been deleted successfully`, 'success');
    },err=>{
      this.showMsg=true;
      this.messages=err.error.error;
      swal.fire({icon: 'error',title : 'Product no deleted', text: `${this.messages}`});
    });
  }

}
