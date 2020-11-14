import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { License } from 'src/app/domain/license';
import { Enable } from 'src/app/domain/enable';
import { LicenseService } from 'src/app/service/license.service';
import { EnableService } from 'src/app/service/enable.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-license-save',
  templateUrl: './license-save.component.html',
  styleUrls: ['./license-save.component.css']
})
export class LicenseSaveComponent implements OnInit {


  public license:License;
  public enables:Enable[];
  public keyGenerated:boolean;

  public showMsg:boolean=false;
  public messages:string[]=[""];


  constructor(
              public router:Router,
              public activatedRoute:ActivatedRoute,
              public licenseService:LicenseService,
              public enableService:EnableService) { }

  ngOnInit(): void {
    this.license=new License(null,null,null,null,null,null,null,null);
    this.enables=this.enableService.findAll();
    this.keyGenerated = false;
  }

  public save():void{
    this.licenseService.save(this.license).subscribe(ok=>{
      this.keyGenerated = true;
      this.license.publicKeyEncode = ok.publicKeyEncode;
      this.downloadKeyLicense(ok.publicKeyEncode);
      swal.fire('License saved', `the License has been saved successfully `, 'success');

    },err=>{
      this.showMsg=false;
      this.messages=err.error.error;
      swal.fire({icon: 'error',title : 'License no saved', text: `${this.messages}`});
    });
  }

  public downloadKeyLicense(file:string) {
        const linkSource = 'data:application/zip;base64,' + file+'\n';
        const downloadLink = document.createElement("a");
        const fileName = "sample.zip";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
  }

}
