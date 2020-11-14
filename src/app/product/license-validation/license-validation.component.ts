import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { License } from 'src/app/domain/license';
import { Enable } from 'src/app/domain/enable';
import { LicenseService } from 'src/app/service/license.service';
import { EnableService } from 'src/app/service/enable.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-license-validation',
  templateUrl: './license-validation.component.html',
  styleUrls: ['./license-validation.component.css']
})
export class LicenseValidationComponent implements OnInit {

  public license:License;
  public enables:Enable[];
  private certificateKey: File;
  public showMsg:boolean=false;
  public messages:string[]=[""];
  public progressSelectFile:number;
  public keyVerify:string;
  public messageVerify:string;
  public error: string;


 constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public licenseService:LicenseService,
              public enableService:EnableService) { }

  ngOnInit(): void {
    let params=this.activatedRoute.params['_value'];
    let serialNumber=params.serialNumber;
    this.findById(serialNumber);
    this.enables=this.enableService.findAll();
    this.keyVerify = "not verify"


  }

  findById(serialNumber:number):void{
    this.licenseService.findBySerialNumber(serialNumber).subscribe(data=>{
      this.license=data;
    });
  }

  selectFile(event) {
    this.certificateKey = event.target.files[0];
    this.progressSelectFile = 0;
    console.log(this.certificateKey);
  }


  uploadFile() {

    if (!this.certificateKey) {
      swal.fire('Error Upload: ', 'Select file', 'error');
    } else {
      console.log('SEND CER'+this.certificateKey);
      this.licenseService.validationWithCertificateKey(this.certificateKey, this.license.serialNumber)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressSelectFile = Math.round((event.loaded / event.total) * 100);
            this.keyVerify = "verify";
          }
        }, err => {
          console.error('Error varify certificate license: ' + err.status);
          console.error(err.error.message);
          this.messageVerify = err.error.message;
          this.keyVerify = "error verify";
        });
    }
  }
}
