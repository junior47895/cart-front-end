import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/service/customer.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit,OnDestroy {

  public customers:Customer[];
  private sub:Subscription;

  constructor(public customerService:CustomerService) { }

  ngOnInit(): void {
      this.sub=this.customerService.findAll().subscribe(data=>{
        this.customers=data;
      });
  }

  ngOnDestroy():void{
    console.log('ngOnDestroy');
    this.sub.unsubscribe();
  }

}
