import { Injectable } from '@angular/core';

import {Http ,Response} from '@angular/http';


import {Observable} from 'rxjs';



@Injectable()
export class MiHttpService {
  
  constructor(public http:Http) { }
  
  public httpGetPromise(url: string, objeto:any){


    return this.http
    .get(url)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }

  private extraerDatos(resp:Response) {

      return resp.json() || {};

  }
  private handleError(error:Response | any) {

      return error;
  }

}
