import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/domain/product';
import { Enable } from 'src/app/domain/enable';
import { ProductService } from 'src/app/service/product.service';
import { EnableService } from 'src/app/service/enable.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-save',
  templateUrl: './product-save.component.html',
  styleUrls: ['./product-save.component.css']
})
export class ProductSaveComponent implements OnInit {


  public product:Product;
  public enables:Enable[];

  public showMsg:boolean=false;
  public messages:string[]=[""];

  constructor(
              public router:Router,
              public activatedRoute:ActivatedRoute,
              public productService:ProductService,
              public enableService:EnableService) { }

  ngOnInit(): void {
    this.product=new Product("","","","","",0);
    this.enables=this.enableService.findAll();
  }

  save():void{
    this.productService.save(this.product).subscribe(ok=>{
      this.showMsg=true;
      this.messages=[""];
      this.messages[0]="El producto se grabo con exito";
      this.router.navigate(['/product-list']);
      swal.fire('Product saved', `the product has been saved successfully`, 'success');
    },err=>{
      this.showMsg=false;
      this.messages=err.error.error;
      swal.fire({icon: 'error',title : 'product no saved', text: `${this.messages}`});
    });
  }
}
