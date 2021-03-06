import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'warsztatZlomek-frontend';
}

export interface LoginModel {
  email?: string;
  password?: string;
}

export interface RegisterModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  cityName?: string;
  streetName?: string;
  buildNum?: string;
  aptNum?: string;
  zipCode?: string;
  password?: string;
  confirmPassword?: string;
}

export interface TokenModel {
  accessToken: string;
}

export interface UserData {
  accessToken: string;
  aptNum: string;
  buildNum: string;
  cityName: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  streetName: string;
  zipCode: string;
  companies: CompanyModel;
}

export interface CarModel {
  id?: number;
  vin?: string;
  registrationNumber?: string;
  model?: string;
  productionYear?: number;
  brandName?: string;
}

export interface ClientUpdateModel extends RegisterModel {
  accessToken: string;
}

export interface AddCarModel extends CarModel {
  accessToken?: string;
}

export interface RegisterEmployeeModel {
  firstName: String;
  lastName: String;
  email: String;
  hireDate: String;
  password: String;
  confirmPassword: String;
  accessToken: String;
}

export interface RemoveEmployeeModel {
  employeeMail: String;
  accessToken: String;
  quitDate: String;
}


export interface VisitModel {
  car: CarModel;
  id: number;
  notVerifiedOwners: UserData[];
  owners: UserData[];
  visitDate: DateConstructor;
}

export interface ShowVisitModel {
  car: CarModel;
  id: number;
  visitDate: DateConstructor;
  isOverview: boolean;
  visitStatus: String;
}

export interface BanUser {
  username: String;
  accessToken: String;
}

export interface GetCompanyModel extends TokenModel {
  companyId: number;
}

export interface CarIdModel {
  carId: number;
  accessToken: String;
}

export interface CarEditModel extends CarModel {
  carId: number;
  accessToken: String;
}

export interface CoownerModel extends CarIdModel {
  coownerUsername: String;
}

export interface CarHasCompanyModel extends CarIdModel {
  companyId: number;
}

export interface CompanyModel {
  aptNum?: string;
  buildingNum?: string;
  cityName?: string;
  streetName?: string;
  zipCode?: string;
  email?: string;
  id?: number;
  companyName?: string;
  nip?: string;
}

export interface CarBrandModel {
  brandName: String;
  accessToken: String;
}

export interface CarPartModel {
  name: string;
  tax: number;
  producer: string;
  accessToken: String;
}

export interface EditCompanyModel {
  id: number;
  aptNum?: string;
  buildingNum?: string;
  cityName?: string;
  streetName?: string;
  zipCode?: string;
  email?: string;
  name?: string;
  nip?: string;
  accessToken: string;
}

export interface GetInvoiceModel {
  id: number;
  accessToken: string;
}

export interface EditCarPartModel extends CarPartResponse {
  accessToken: string;
}

export interface ServiceModel {
  id: number;
  name: String;
  tax: number;
  accessToken: String;
}

export interface CarPartResponse {
  name: String;
  tax: number;
  producer: String;
  id: number;
}

export interface AddCompanyModel extends CompanyModel {
  accessToken: String;
}

export interface AddVisitModel {
  accessToken: String;
  carId: number;
  visitDate: String;
  isOverview: boolean;
}

export interface CarResponseModel {
  accessToken: String;
  id: number;
  vin: String;
  registrationNumber: String;
  model: String;
  productionYear: number;
  brandName: String;
}

export interface VisitElementResponse {
  name: string;
  count: number;
  price: number;
}

export interface VisitPartResponse extends VisitElementResponse{
  producer: string;
}

export interface VisitResponse {
  id: number;
  visitDate: string;
  car: CarModel;
  owners: UserData[];
  notVerifiedOwners: UserData[];
  visitStatus: String;
  parts: VisitPartResponse[];
  services: VisitElementResponse[];
}

export interface VisitResponseOverview extends VisitResponse {
  overview: boolean;
}

export interface RemoveVisitModel extends TokenModel {
  visitId: number;
}

export interface AddEmployeeToVisit extends TokenModel {
  visitId: number;
}


export interface SubmitVisitModel extends AddEmployeeToVisit {
  carParts: CarPartEditVisitModel[];
  services: ServiceEditVisitModel[];
  countYears: number;
  status: String;
}

export interface ShowEmployeeVisitModel extends VisitModel {
  visitStatus: string;
}


export interface CarPartEditVisitModel {
  price: String;
  count: number;
  id: number;
}

export interface ServiceModel {
  id: number;
  name: String;
  tax: number;
}

export interface ServiceEditVisitModel {
  id: number;
  price: String;
  count: number;
}

export interface InvoiceForm {
  accessToken: string;
  discount: number;
  methodOfPayment: string;
  paymentDate: string;
  visitId: number;
  companyName: string;
}

export interface EditInvoice extends InvoiceForm {
  invoiceId: number;
}

export interface InvoiceResponse {
  id: number;
  dayOfIssue: string;
  discount: number;
  grossValue: string;
  netValue: string;
  invoiceNumber: string;
  methodOfPayment: string;
  paymentDate: string;
  serviceFinishDate: string;
  carServiceData: CompanyModel;
  companyData: CompanyModel;
  invoicePositions: InvoicePositionResponse[];
}

export interface InvoicePositionResponse {
  positionName: string;
  grossPrice: string;
  netPrice: string;
  unitOfMeasure: string;
  valueOfVat: string;
  vatTax: string;
  count: number;
}

export interface AcceptProFormaInvoice extends TokenModel {
  proFormaInvoiceId: number;
}

export interface ClientCompany extends TokenModel {
  companyName: string;
  username: string;
}

export interface GetClientData extends TokenModel {
  username: string;
}

export interface VerificationModel extends TokenModel {
  owners: UserData[];
  notOwners: UserData[];
  car: CarModel;
}

export interface AddServiceForm extends TokenModel {
  name: string;
  tax: number;
}

export interface GetVisitDetails extends TokenModel {
  visitId: number;
}
