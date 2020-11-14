import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { License } from 'src/app/domain/license';
import { LicenseService } from 'src/app/service/license.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrls: ['./license-list.component.css']
})
export class LicenseListComponent implements OnInit,OnDestroy {

  public licenses:License[];
  private sub:Subscription;

  constructor(public licenseService:LicenseService) { }

  delete(license:License):void{
    this.licenseService.delete(license.serialNumber).subscribe(ok=>{
      // this.showMsg=true;
      // this.messages=[""];
      // this.messages[0]="El customer se borro con exito";
      this.findAll();
      swal.fire('License deleted', `the License has been deleted successfully`, 'success');
    },err=>{
      // this.showMsg=true;
      // this.messages=err.error.error;
    });
  }

  findAll():void{
    this.sub=this.licenseService.findAll().subscribe(data=>{
      this.licenses=data;
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
