import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {

    AddCarModel,
    CarEditModel,
    CarHasCompanyModel,
    CarIdModel,
    CoownerModel,
    AddVisitModel,
    BanUser,
    ClientUpdateModel,
    LoginModel,
    RegisterEmployeeModel,
    RegisterModel,
    RemoveEmployeeModel,
    TokenModel,
    CarBrandModel,
    CarPartModel,
    AddCompanyModel,
    RemoveVisitModel,
    AddEmployeeToVisit,
    SubmitVisitModel,
    InvoiceForm,
    EditCarPartModel,
    ServiceModel,
    GetCompanyModel,
    EditCompanyModel,
    GetInvoiceModel,
    EditInvoice,
    AcceptProFormaInvoice,
    GetClientData,
    ClientCompany,
    VerificationModel,
    AddServiceForm,
    GetVisitDetails
} from './app.component';
import {map} from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(loginM: LoginModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/authorization/signIn', loginM)
            .pipe(map(user => {
                if (user && user.accessToken) {
                    console.log(user);
                    localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                }
                return user;
            }));
    }


    logoutEmployee() {

        const accessToken = this.getAccessToken();
        const tokenModel: TokenModel = {'accessToken': accessToken};
        localStorage.removeItem('warsztatZlomekEmployee');
        return this.http.post<any>('http://127.0.0.1:8080/rest/authorization/signOutEmployee', tokenModel).subscribe(() => {

            },
            (error1 => {
                console.log(error1);
            }));
    }

    loginEmployee(loginM: LoginModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/employee', loginM)
            .pipe(map(user => {
                if (user && user.accessToken) {
                    const date = new Date();
                    date.setTime(date.getTime() + (20 * 60 * 1000));
                    localStorage.setItem('warsztatZlomekEmployee', user.accessToken.valueOf() + ';' + date.toString());
                }
                console.log(user.accessToken);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    register(registerM: RegisterModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/authorization', registerM)
            .pipe(map(user => {
                return user;
            }));
    }

    getAccountData(token: TokenModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/client/', token)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                return user;
            }));
    }

    getCars(token: TokenModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/car/getClientsCars', token)
            .pipe(map(cars => {
                localStorage.setItem('currentUser', JSON.stringify(cars.accessToken.valueOf()));
                return cars;
            }));
    }

    updateClientData(client: ClientUpdateModel) {
        return this.http.put<any>('http://127.0.0.1:8080/rest/client', client)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                return user;
            }));
    }

    deleteUser(token: TokenModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/client/remove', token)
            .pipe(map(user => {
                return user;
            }));
    }

    getAllClientVisits(token: TokenModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/visits/all', token)
            .pipe(map(visits => {
                localStorage.setItem('currentUser', JSON.stringify(visits.accessToken.valueOf()));
                return visits;
            }));
    }

    getFutureVisits(token: TokenModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/visits/futureVisits', token)
            .pipe(map(visits => {
                localStorage.setItem('currentUser', JSON.stringify(visits.accessToken.valueOf()));
                return visits;
            }));
    }

    getCarBrands() {
        return this.http.get<any>('http://127.0.0.1:8080/rest/car/getCarBrands')
            .pipe(map(cars => {
                return cars;
            }));
    }

    addCar(car: AddCarModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/car', car)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                return user;
            }));
    }

// cors jebie błędami
    deleteCar(id: CarIdModel) {
        return this.http.put<any>('http://127.0.0.1:8080/rest/car/' + id.carId, id)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                return user;
            }));
    }

    editCar(car: CarEditModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/car/editCar', car)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                return user;
            }));
    }


    addCoowner(owner: CoownerModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/car/addCoowner', owner)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                return user;
            }));
    }

    removeCoowner(owner: CoownerModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/car/removeCoowner', owner)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                return user;
            }));
    }

// nie robiłem dodawania i usuwania samochodu z firmy
    addCarToCompany(company: CarHasCompanyModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/car/addCarToCompany', company)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                return user;
            }));
    }

    removeCarFromCompany(company: CarHasCompanyModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/car/removeCarFromCompany', company)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                return user;
            }));
    }

    addVisit(visit: AddVisitModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/visits/', visit)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                return user;
            }));
    }

    removeVisit(visit: RemoveVisitModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/visits/remove/' + visit.visitId, visit)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.accessToken.valueOf()));
                return user;
            }));
    }

    getClientsCompanies(token: TokenModel) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/client/companies', token)
            .pipe(map(companies => {
                localStorage.setItem('currentUser', JSON.stringify(companies.accessToken.valueOf()));
                return companies;
            }));
    }

    registerEmployee(registerEmployeeModel: RegisterEmployeeModel) {
        if (registerEmployeeModel.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/authorization/registerEmployee',
            registerEmployeeModel).subscribe(
            () => {
                this.setExpirationDate();
                console.log('sukces');

            },
            (data) => {
                console.log(data);
                if (data.accessToken !== null) {
                    this.setExpirationDate();
                }
            }
        );
    }

    removeEmployee(removeEmployeeModel: RemoveEmployeeModel) {
        if (removeEmployeeModel.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/authorization/removeEmployee',
            removeEmployeeModel).subscribe(
            (data) => {
                this.setExpirationDate();
                console.log(data);
            },
            (data) => {
                console.log(data);
            }
        );
    }

    employeeAddVisit(visit: AddVisitModel) {
        if (visit.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/visits/createEmpty', visit)
            .subscribe(
                (data) => {
                    this.setExpirationDate();
                    alert('Dodano wizytę');
                },
                (data) => {
                    console.log(data);
                    alert('Błąd!!!');
                    if (data.accessToken !== null) {
                        this.setExpirationDate();
                    }
                }
            );
    }

    getNotFinishedVisits(token: TokenModel) {
        if (token.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/visits/notFinished', token)
            .pipe(map(visits => {
                return visits;
            }));
    }

    getNewVisits(token: TokenModel) {
        if (token.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/visits/employee/new', token)
            .pipe(map(visits => {
                console.log(visits);
                return visits;
            }));
    }

    getEmployeesVisits(token: TokenModel) {
        if (token.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/employee/visits', token)
            .pipe(map(visits => {
                return visits;
            }));
    }

    getAccessToken() {
        const value = localStorage.getItem('warsztatZlomekEmployee');
        if (value == null) {
            return null;
        }
        const values = value.split(';');
        if (new Date().valueOf() < new Date(values[1]).valueOf()) {
            return values[0];
        } else {
            localStorage.removeItem('warsztatZlomekEmployee');
            return null;
        }

    }

    banUserRequest(form: BanUser) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/client/ban', form).subscribe(
            (data) => {
                this.setExpirationDate();
                alert('Użytkownik został zablokowany');
            },
            (data) => {
                console.log(data);
                alert('Błąd!!!');
                if (data.accessToken !== null) {
                    this.setExpirationDate();
                }
            }
        );
    }

    addCarBrand(form: CarBrandModel) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/car/carBrand', form).subscribe(
            (data) => {
                this.setExpirationDate();
                alert('Dodano markę do bazy!');
            },
            (data) => {
                alert('Błąd!!!');
                if (data.accessToken !== null) {
                    this.setExpirationDate();
                }
            }
        );
    }

    addCarPart(form: CarPartModel) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/visitElements/carPart', form).subscribe(
            (data) => {
                this.setExpirationDate();
                alert('Dodano część do bazy!');
            },
            (data) => {
                alert('Błąd!!!');
                if (data.accessToken !== null) {
                    this.setExpirationDate();
                }
            }
        );
    }

    addCompany(form: AddCompanyModel) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/companies/addCompany', form).subscribe(
            (data) => {
                this.setExpirationDate();
                alert('Dodano firmę!');
            },
            (data) => {
                alert('Błąd!!!');
                if (data.accessToken !== null) {
                    this.setExpirationDate();
                }
            }
        );
    }

    addCarService(form: AddCompanyModel) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/companies/carService', form).subscribe(
            (data) => {
                this.setExpirationDate();
                alert('Dodano dane serwisu!');
            },
            (data) => {
                alert('Błąd!!!');
                if (data.accessToken !== null) {
                    this.setExpirationDate();
                }
            }
        );
    }

    addEmployeeToVisit(visit: AddEmployeeToVisit) {
        if (visit.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/visits/acceptedVisit', visit)
            .pipe(map(visits => {
                alert('Operacja została wykonana pomyślnie!');
                return visits;
            }));
    }

    editVisit(visit: SubmitVisitModel) {
        if (visit.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/visits/edit', visit)
            .pipe(map(visits => {
                alert('Operacja została wykonana pomyślnie!');
                return visits;
            }));
    }

    generateInvoice(form: InvoiceForm, url) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>(url, form)
            .pipe(map(result => {
                alert('Operacja została wykonana pomyślnie!');
                return result;
            }));
    }

    setExpirationDate() {
        let token = localStorage.getItem('warsztatZlomekEmployee').valueOf();
        const array = token.split(';');
        const date = new Date();
        date.setTime(date.getTime() + (20 * 60 * 1000));
        array[1] = date.toString();
        token = array.join(';');
        localStorage.setItem('warsztatZlomekEmployee', token);
    }

    getVisitElements() {
        return this.http.post<any>('http://127.0.0.1:8080/rest/visitElements', {'accessToken': this.getAccessToken()})
            .pipe(map(result => {
                return result;
            }));
    }

    editCarPart(form: EditCarPartModel) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/visitElements/editCarPart', form).subscribe(
            (data) => {
                this.setExpirationDate();
                alert('Operacja została wykonana pomyślnie!');
            },
            (data) => {
                alert('Błąd!!!');
                if (data.accessToken !== null) {
                    this.setExpirationDate();
                }
            }
        );
    }

    editService(form: ServiceModel) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/visitElements/editService', form).subscribe(
            (data) => {
                this.setExpirationDate();
                alert('Operacja została wykonana pomyślnie!');
            },
            (data) => {
                alert('Błąd!');
                if (data.accessToken !== null) {
                    this.setExpirationDate();
                }
            }
        );
    }


    getEditVisitData() {
        const accessToken = {
            accessToken: this.getAccessToken()
        };
        return this.http.post<any>('http://127.0.0.1:8080/rest/visitElements/', accessToken)
            .pipe(map(visits => {
                return visits;
            }));
    }


    getAllCompanies() {
        const form: TokenModel = {
            accessToken: this.getAccessToken()
        };
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/companies/getCompanies', form).pipe(map((result) => {
                return result;
            }
        ));
    }

    getCompanyById(id: number) {
        const form: GetCompanyModel = {
            accessToken: this.getAccessToken(),
            companyId: id
        };
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/companies/' + form.companyId, form).pipe(map((result) => {
                return result;
            }
        ));
    }

    editCompany(form: EditCompanyModel) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/companies/editCompany', form).subscribe(
            (data) => {
                this.setExpirationDate();
                alert('Operacja została wykonana pomyślnie!');
            },
            (data) => {
                alert('Błąd!!!');
                if (data.accessToken !== null) {
                    this.setExpirationDate();
                }
            }
        );
    }

    getInvoices(url: string) {
        const form: TokenModel = {
            accessToken: this.getAccessToken()
        };
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>(url, form).pipe(map((result) => {
                return result;
            })
        );
    }

    getInvoice(id: number) {
        const form: GetInvoiceModel = {
            accessToken: this.getAccessToken(),
            id: id
        };
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/invoice/getInvoiceDetails', form).pipe(map((result) => {
                return result;
            })
        );
    }

    editInvoice(form: EditInvoice) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/invoices/edit', form)
            .pipe(map(result => {
                alert('Operacja została wykonana pomyślnie!');
                return result;
            }));
    }

    acceptProFormaInvoice(form: AcceptProFormaInvoice) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/invoices/addProForma', form)
            .pipe(map(result => {
                return result;
            }));
    }

    addClientToCompany(form: ClientCompany) {
        if (form.accessToken == null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/client/addToCompany', form).subscribe(
            result => {
                this.setExpirationDate();
                alert('Operacja została wykonana pomyślnie!');
            }, (result) => {
                alert('Błąd!!!');
                if (result.accessToken !== null) {
                    this.setExpirationDate();
                }
            });
    }

    getClientData(form: GetClientData) {
        if (form.accessToken === null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/client/' + form.username, form).pipe(map((result) => {
            return result;
        }));
    }

    removeClientFromCompany(form: ClientCompany) {
        if (form.accessToken === null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/client/removeFromCompany',
            form).pipe(map((result) => {
            alert('Operacja została wykonana pomyślnie!');
            return result;
        }));
    }

    verifyOwnership(form: VerificationModel) {
        if (form.accessToken === null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/car/verifyOwnership',
            form).pipe(map((result) => {
            return result;
        }));
    }

    addService(form: AddServiceForm) {
        if (form.accessToken === null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/visitElements/service',
            form).pipe(map((result) => {
            alert('Operacja została wykonana pomyślnie!');
            return result;
        }));
    }

    getVisitDetails(form: GetVisitDetails) {
        const tokenModel = {
            accessToken: this.getAccessToken()
        };
        return this.http.post<any>('http://127.0.0.1:8080/rest/visits/employeeVisit/' + form.visitId,
            tokenModel).pipe(map((result) => {
            return result;
        }));
    }

    checkCar(form) {
        return this.http.post<any>('http://127.0.0.1:8080/rest/visits/getAllCarVisits',
            form).pipe(map((result) => {
            return result;
        }));
    }

    getCompanies(form: TokenModel) {
        if (form.accessToken === null) {
            return;
        }
        return this.http.post<any>('http://127.0.0.1:8080/rest/companies/getCompanies',
            form).pipe(map((result) => {
            return result;
        }));
    }
}
