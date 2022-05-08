import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ListResponseModel } from "../models/listResponseModel";
import { CarDetail } from "../models/carDetail";
import { Car } from "../models/car";

@Injectable({
    providedIn: 'root'
  })

  export class CarService{
     apiUrl="https://localhost:44364/api/";

     constructor(private httpClient:HttpClient) { }

     getCars():Observable<ListResponseModel<CarDetail>>{
         let newPath=this.apiUrl + "cars/getall"
         return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
     }

     getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
         let newPath = this.apiUrl + "cars/getCarsByBrandId?brandId=" + brandId;
         return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
     }

     getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
        let newPath = this.apiUrl + "cars/getcarsbycolorid?colorId=" + colorId;
        return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
    }

    getCarDetails():Observable<ListResponseModel<CarDetail>>{
        let newPath = this.apiUrl + "cars/getCarDetails";
        return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
    }

    getCarsDetailsByCar(carId:number):Observable<ListResponseModel<CarDetail>> {
        let newPath = this.apiUrl + "cars/getbyid?carId=" + carId;
        return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
      }
    
      getCarsDetailsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
          let newPath = this.apiUrl + "cars/getalldetailsbybrandid?brandid=" + brandId;
          return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
      }
      
      getCarsDetailsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
          let newPath = this.apiUrl + "cars/getalldetailsbycolorid?colorid=" + colorId;
          return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
      }

      getCarDetailsByColorAndBrand(brandId:number, colorId: number):Observable<ListResponseModel<Car>> {
        let newPath = this.apiUrl + 'cars/getcarsbybrandandcolor?brandid=' + brandId + '&colorid=' + colorId;
        return this.httpClient.get<ListResponseModel<Car>> (newPath);
    }
  }