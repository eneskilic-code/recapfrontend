import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {

  carDetails: CarDetail[] = [];
  cars: Car[] = [];
  dataLoaded = false;
  filterText="";

  constructor(
    private carService:CarService, private activatedRouted:ActivatedRoute) { }

    ngOnInit(): void {
      this.activatedRouted.params.subscribe(params =>{
        if(params["brandId"]){
          this.getCarsDetailsByBrand(params["brandId"])
        }else if(params["colorId"]){
          this.getCarsDetailsByColor(params["colorId"])
        }else{
          this.getCarDetails();
        }
      });
    }

    getCars() {
      this.carService.getCars().subscribe(response => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
    }

    getCarsByBrand(brandId:number) {
      this.carService.getCarsByBrand(brandId).subscribe(response => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
    }

    getCarsByColor(colorId:number) {
      this.carService.getCarsByColor(colorId).subscribe(response => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
    }

    getCarDetails(){
      this.carService.getCarDetails().subscribe(response =>{
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
    }

    getCarsDetailsByCar(carId: number) {
      this.carService.getCarsDetailsByCar(carId).subscribe(response => {
        this.carDetails = response.data;
        this.dataLoaded = true;  
  
      });
    }

    getCarsDetailsByBrand(brandId:number) {
      this.carService.getCarsDetailsByBrand(brandId).subscribe(response=> {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
    }
  
    getCarsDetailsByColor(colorId:number) {
      this.carService.getCarsDetailsByColor(colorId).subscribe(response => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
    }

  //   getCarsByBrandIdAndColorId(brandId: number, colorId: number) {
  //     this.carService.getCarDetails().subscribe(response => {
  //        this.carDetails = response.data.filter(car =>
  //           car.brandId == brandId && car.colorId == colorId
  //        );
  //     });
  //  }

  
}