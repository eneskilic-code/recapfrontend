import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
    providedIn: 'root'
  })

  export class RentalService{
      apiUrl = "https://localhost:44364/api/";
      rentingCar: Rental;

      constructor(private httpClient:HttpClient) {this.getRentals(); }

      getRentals():Observable<ListResponseModel<Rental>>{
          let newPath = this.apiUrl + "rentals/getRentalDetails";
          return this.httpClient.get<ListResponseModel<Rental>>(newPath);
      }

      getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
          let newPath = this.apiUrl + "rentals/getById?id=" + carId;
          return this.httpClient.get<ListResponseModel<Rental>>(newPath);
      }

      setRentingCar(rental:Rental){
          this.rentingCar = rental;
      }

      getRentingCar(){
          return this.rentingCar;
      }

    //   removeRentingCar(){
    //       this.rentingCar = null;    
    //   }

  }