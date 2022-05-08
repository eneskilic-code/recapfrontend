import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})
export class CarRentComponent implements OnInit {

  rental: Rental;
  carId: number;
  addRentCarForm: FormGroup;
  currentDate: Date = new Date();
  
  constructor(private formBuiler: FormBuilder, private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService, private rentalService: RentalService, private router: Router) { }

  ngOnInit(): void {
    this.carId = Number(this.activatedRoute.snapshot.paramMap.get('carId'));
    localStorage.setItem("carId", String(this.activatedRoute.snapshot.paramMap.get('carId')));
    this.createAddRentCarForm();
  }

  createAddRentCarForm() {
    this.addRentCarForm = this.formBuiler.group({
      carId: [this.carId, Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  setRentingCar(){
    if(this.addRentCarForm.invalid){
      this.toastrService.warning("Alanları kontrol ediniz", "Dikkat!");
      return false;
    }

    this.rental = this.addRentCarForm.value;
    let rentDate = new Date(this.rental.rentDate);
    let returnDate = new Date(this.rental.returnDate);

    if(rentDate < this.currentDate){
      this.toastrService.warning("Kiralama tarihi bu günden önce olamaz", "Dikkat!");
      return false;
    }

    if(returnDate < rentDate || returnDate.getDate() == rentDate.getDate()){
      this.toastrService.warning("Dönüş tarihi kiralama tarihinden önce olamaz", "Dikkat!");
      return false;
    }

    this.rentalService.setRentingCar(this.rental);
    this.toastrService.success("Ödeme sayfasına yönlendiriliyorsunuz");
    return this.router.navigate(["/cars"]);
  }

  checkCarRentable(){
    this.rentalService.getRentalsByCarId(this.carId).subscribe(responseSuccess =>{
      if(responseSuccess.data[0] == null){
        this.setRentingCar();
        return true;
      }

      let lastItem = responseSuccess.data[responseSuccess.data.length - 1];
      if(lastItem.returnDate == null){
        return this.toastrService.error("Bu araç henüz teslim edilmemiştir");
      }

      let returnDate = new Date(lastItem.returnDate);
      this.setRentingCar();

      // if(new Date(this.rental.rentDate) < returnDate){
      //   this.rentalService.removeRentingCar();
      //   return this.toastrService.warning("Bu aracı ilgili tarihler arsında kiralayamazsınız", "Dikkat!");
      // }

      return true;
    });
  }
}
