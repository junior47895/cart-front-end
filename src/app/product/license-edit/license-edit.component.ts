import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { License } from 'src/app/domain/license';
import { Enable } from 'src/app/domain/enable';
import { LicenseService } from 'src/app/service/license.service';
import { EnableService } from 'src/app/service/enable.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-license-edit',
  templateUrl: './license-edit.component.html',
  styleUrls: ['./license-edit.component.css']
})
export class LicenseEditComponent implements OnInit {

  public license:License;
  public enables:Enable[];

  public showMsg:boolean=false;
  public messages:string[]=[""];

  constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public licenseService:LicenseService,
              public enableService:EnableService) { }

  ngOnInit(): void {
    let params=this.activatedRoute.params['_value'];
    let serialNumber=params.serialNumber;
    this.findById(serialNumber);
    this.enables=this.enableService.findAll();
  }

  findById(serialNumber:number):void{
    this.licenseService.findBySerialNumber(serialNumber).subscribe(data=>{
      this.license=data;
    });
  }

  update():void{
    this.licenseService.update(this.license.serialNumber, this.license).subscribe(ok=>{
      this.showMsg=true;
      this.messages=[""];
      this.messages[0]="El customer se modifico con exito";
      this.router.navigate(['/license-list']);
      swal.fire('License updated', `the License has been updated successfully`, 'success');
    },err=>{
      this.showMsg=false;
      this.messages=err.error.error;
      swal.fire({icon: 'error',title : 'License no updated', text: `${this.messages}`});
    });
  }

  delete():void{
    this.licenseService.delete(this.license.serialNumber).subscribe(ok=>{
      this.showMsg=true;
      this.messages=[""];
      this.messages[0]="El customer se borro con exito";
      this.router.navigate(['/license-list']);
      swal.fire('License deleted', `the License has been deleted successfully`, 'success');
    },err=>{
      this.showMsg=true;
      this.messages=err.error.error;
      swal.fire({icon: 'error',title : 'License no deleted', text: `${this.messages}`});
    });
  }

}
