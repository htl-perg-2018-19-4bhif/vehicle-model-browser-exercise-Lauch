import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface IModels {
  id: number;
  year: number;
  make: string;
  model: string;
  hasDetails: number;
};

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  years: number[];
  makes: string[];
  ergebnis: IModels[];
  year: number;
  make: string;

  constructor(private http: HttpClient) {
    this.getYears();
    this.getModels();
  }

  ngOnInit() {
  }

  async getYears() {
    this.years = await this.http.get<number[]>('https://vehicle-data.azurewebsites.net/api/years').toPromise();

  }

  async getModels() {
    this.makes = await this.http.get<string[]>('https://vehicle-data.azurewebsites.net/api/makes').toPromise();
  }

  async refresh() {
    this.loadResults();
  }

  async loadResults() {
    if (!this.make && !this.year) {
      this.ergebnis = await this.http.get<IModels[]>(`https://vehicle-data.azurewebsites.net/api/models`).toPromise();
    } else if (!this.make) {
      this.ergebnis = await this.http.get<IModels[]>(`https://vehicle-data.azurewebsites.net/api/models?year=${this.year}`).toPromise();
    } else if (!this.year) {
      this.ergebnis = await this.http.get<IModels[]>(`https://vehicle-data.azurewebsites.net/api/models?make=${this.make}`).toPromise();
    } else {
      this.ergebnis = await this.http.get<IModels[]>(`https://vehicle-data.azurewebsites.net/api/models?make=${this.make}&year=${this.year}`).toPromise();
    }
  }
}
