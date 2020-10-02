import { Component } from '@angular/core';

@Component({
selector: 'app-footer',
templateUrl: './footer.component.html',
styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public autor: any = {nombre:'Luis Carlos', apellido: 'Cabal Rojas'};
  public universidad = 'Universidad de San Buenaventura - CALI';
}
