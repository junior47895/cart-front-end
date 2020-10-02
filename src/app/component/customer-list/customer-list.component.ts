import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/service/customer.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit,OnDestroy {

  public customers:Customer[];
  private sub:Subscription;

  constructor(public customerService:CustomerService) { }

  delete(customer:Customer):void{
    this.customerService.delete(customer.email).subscribe(ok=>{
      // this.showMsg=true;
      // this.messages=[""];
      // this.messages[0]="El customer se borro con exito";
      this.findAll();
      swal.fire('Customer deleted', `the customer has been deleted successfully`, 'success');
    },err=>{
      // this.showMsg=true;
      // this.messages=err.error.error;
    });
  }

  findAll():void{
    this.sub=this.customerService.findAll().subscribe(data=>{
      this.customers=data;
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
