import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  public customer:Customer;
  public enables:Enable[];

  public showMsg:boolean=false;
  public messages:string[]=[""];

  constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public customerService:CustomerService,
              public enableService:EnableService) { }

  ngOnInit(): void {
    let params=this.activatedRoute.params['_value'];
    let email=params.email;
    this.findById(email);
    this.enables=this.enableService.findAll();
  }

  findById(email:string):void{
    this.customerService.findById(email).subscribe(data=>{
      this.customer=data;
    });
  }

  update():void{
    this.customerService.update(this.customer).subscribe(ok=>{
      this.showMsg=true;
      this.messages=[""];
      this.messages[0]="El customer se modifico con exito";
    },err=>{
      this.showMsg=true;
      this.messages=err.error.error;
    });
  }

  delete():void{
    this.customerService.delete(this.customer.email).subscribe(ok=>{
      this.showMsg=true;
      this.messages=[""];
      this.messages[0]="El customer se borro con exito";
    },err=>{
      this.showMsg=true;
      this.messages=err.error.error;
    });
  }

}
