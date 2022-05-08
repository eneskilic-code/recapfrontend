import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carImage.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetail;
  imageUrl = 'https://localhost:44364';
  dataLoaded: boolean = false;

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,
  private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params['carId']){
        this.getCarsDetailsByCar(params['carId']) 
      }
    });
  }

  getCarsDetailsByCar(carId:number){
    this.carService.getCarsDetailsByCar(carId).subscribe(response =>{
      this.carDetail = response.data[0];  
      this.dataLoaded = true;
    });
  }

  imageClassGenerate(imagePath:string){
    if(imagePath == this.carDetail.images[0]){  
      return 'carousel-item active'
    }else{
      return 'carousel-item'
    }
  }

}
