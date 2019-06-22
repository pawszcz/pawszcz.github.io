(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"currency-converter-container\">\r\n  <div class=\"header\">\r\n    <mat-card-title>Przelicznik walut</mat-card-title>\r\n    <mat-card-subtitle>Zobacz ile dostaniesz!</mat-card-subtitle>\r\n  </div>\r\n\r\n  <mat-divider></mat-divider>\r\n\r\n  <mat-card-content>\r\n    <form\r\n      [formGroup]=\"currencyForm\"\r\n      class=\"currency-form\"\r\n      (ngSubmit)=\"submitHandler()\"\r\n    >\r\n      <mat-form-field>\r\n        <input\r\n          matInput\r\n          placeholder=\"Kwota\"\r\n          value=\"\"\r\n          autocomplete=\"off\"\r\n          formControlName=\"amount\"\r\n          type=\"number\"\r\n        />\r\n        <mat-error *ngIf=\"currencyForm.get('amount').hasError('required')\">\r\n          Pole jest wymagane\r\n        </mat-error>\r\n        <mat-error *ngIf=\"currencyForm.get('amount').hasError('min')\">\r\n          Kwota jest za mała\r\n        </mat-error>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <mat-label>Mam</mat-label>\r\n        <mat-select formControlName=\"from\">\r\n          <mat-option\r\n            *ngFor=\"let currency of exchangeratesRates\"\r\n            [value]=\"{ code: currency.code, mid: currency.mid }\"\r\n          >\r\n            {{ currency.code }} - {{ currency.currency }}\r\n          </mat-option>\r\n        </mat-select>\r\n        <mat-error *ngIf=\"currencyForm.get('from').hasError('required')\">\r\n          Pole jest wymagane\r\n        </mat-error>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <mat-label>Chcę otrzymać</mat-label>\r\n        <mat-select formControlName=\"to\">\r\n          <mat-option\r\n            *ngFor=\"let currency of exchangeratesRates\"\r\n            [value]=\"{ code: currency.code, mid: currency.mid }\"\r\n          >\r\n            {{ currency.code }} - {{ currency.currency }}\r\n          </mat-option>\r\n        </mat-select>\r\n        <mat-error *ngIf=\"currencyForm.get('to').hasError('required')\">\r\n          Pole jest wymagane\r\n        </mat-error>\r\n      </mat-form-field>\r\n\r\n      <button\r\n        mat-raised-button\r\n        color=\"primary\"\r\n        [disabled]=\"currencyForm.invalid\"\r\n      >\r\n        Przelicz\r\n      </button>\r\n    </form>\r\n  </mat-card-content>\r\n\r\n  <div class=\"result\" *ngIf=\"result\">\r\n    <div class=\"result-value\">\r\n      {{ beginingAmount | number }}\r\n      {{ currencyForm.get(\"from\").value.code }}\r\n      =\r\n      {{ result | number }}\r\n      {{ currencyForm.get(\"to\").value.code }}\r\n    </div>\r\n  </div>\r\n</mat-card>\r\n\r\n<div class=\"footer\">\r\n  Paweł Szczepaniak - Nr indeksu 97353\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/_helpers/add-json.interceptor.ts":
/*!**************************************************!*\
  !*** ./src/app/_helpers/add-json.interceptor.ts ***!
  \**************************************************/
/*! exports provided: AddJsonInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddJsonInterceptor", function() { return AddJsonInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");



let AddJsonInterceptor = class AddJsonInterceptor {
    intercept(request, next) {
        const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]().set('format', 'json');
        request = request.clone({
            params,
        });
        return next.handle(request);
    }
};
AddJsonInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], AddJsonInterceptor);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".currency-converter-container {\n  position: absolute;\n  left: calc(50% - 350px);\n  top: 25%;\n  box-shadow: 0px 5px 10px 0px #422574;\n}\n\n.currency-converter-container .header,\n.currency-form {\n  padding: 16px;\n}\n\n.currency-form {\n  padding-bottom: 0;\n}\n\n.mat-raised-button,\n.mat-form-field:not(:first-child) {\n  margin-left: 32px;\n}\n\n.mat-form-field:first-child {\n  width: 100px;\n}\n\n.result {\n  text-align: center;\n  margin: 20px !important;\n  margin-top: 30px !important;\n}\n\n.result-value {\n  font-size: 36px;\n  margin: 10px 0;\n}\n\n.footer {\n  position: absolute;\n  bottom: 30px;\n  left: calc(50% - 200px);\n  width: 400px;\n  font-family: \"Calibri\", sans-serif;\n  font-size: 18px;\n  font-weight: bold;\n  text-align: center;\n  text-transform: uppercase;\n  color: #58319b;\n  text-shadow: 0px 1px 0px rgba(200, 200, 200, 0.1), 0px -1px 0px rgba(0, 0, 0, 0.7);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQzpcXFVzZXJzXFxQYXdlxYJcXERvY3VtZW50c1xcUHJvamVjdHNcXGN1cnJlbmN5LWNvbnZlcnRlci9zcmNcXGFwcFxcYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EsUUFBQTtFQUNBLG9DQUFBO0FDQ0Y7O0FERUE7O0VBRUUsYUFBQTtBQ0NGOztBREVBO0VBQ0UsaUJBQUE7QUNDRjs7QURFQTs7RUFFRSxpQkFBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSx1QkFBQTtFQUNBLDJCQUFBO0FDQ0Y7O0FERUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0NBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGtGQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY3VycmVuY3ktY29udmVydGVyLWNvbnRhaW5lciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGxlZnQ6IGNhbGMoNTAlIC0gMzUwcHgpO1xyXG4gIHRvcDogMjUlO1xyXG4gIGJveC1zaGFkb3c6IDBweCA1cHggMTBweCAwcHggIzQyMjU3NDtcclxufVxyXG5cclxuLmN1cnJlbmN5LWNvbnZlcnRlci1jb250YWluZXIgLmhlYWRlcixcclxuLmN1cnJlbmN5LWZvcm0ge1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbn1cclxuXHJcbi5jdXJyZW5jeS1mb3JtIHtcclxuICBwYWRkaW5nLWJvdHRvbTogMDtcclxufVxyXG5cclxuLm1hdC1yYWlzZWQtYnV0dG9uLFxyXG4ubWF0LWZvcm0tZmllbGQ6bm90KDpmaXJzdC1jaGlsZCkge1xyXG4gIG1hcmdpbi1sZWZ0OiAzMnB4O1xyXG59XHJcblxyXG4ubWF0LWZvcm0tZmllbGQ6Zmlyc3QtY2hpbGQge1xyXG4gIHdpZHRoOiAxMDBweDtcclxufVxyXG5cclxuLnJlc3VsdCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbjogMjBweCAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi10b3A6IDMwcHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLnJlc3VsdC12YWx1ZSB7XHJcbiAgZm9udC1zaXplOiAzNnB4O1xyXG4gIG1hcmdpbjogMTBweCAwO1xyXG59XHJcblxyXG4uZm9vdGVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYm90dG9tOiAzMHB4O1xyXG4gIGxlZnQ6IGNhbGMoNTAlIC0gMjAwcHgpO1xyXG4gIHdpZHRoOiA0MDBweDtcclxuICBmb250LWZhbWlseTogXCJDYWxpYnJpXCIsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGNvbG9yOiAjNTgzMTliO1xyXG4gIHRleHQtc2hhZG93OiAwcHggMXB4IDBweCByZ2JhKDIwMCwgMjAwLCAyMDAsIDAuMSksXHJcbiAgICAwcHggLTFweCAwcHggcmdiYSgwLCAwLCAwLCAwLjcpO1xyXG59XHJcbiIsIi5jdXJyZW5jeS1jb252ZXJ0ZXItY29udGFpbmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiBjYWxjKDUwJSAtIDM1MHB4KTtcbiAgdG9wOiAyNSU7XG4gIGJveC1zaGFkb3c6IDBweCA1cHggMTBweCAwcHggIzQyMjU3NDtcbn1cblxuLmN1cnJlbmN5LWNvbnZlcnRlci1jb250YWluZXIgLmhlYWRlcixcbi5jdXJyZW5jeS1mb3JtIHtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLmN1cnJlbmN5LWZvcm0ge1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbn1cblxuLm1hdC1yYWlzZWQtYnV0dG9uLFxuLm1hdC1mb3JtLWZpZWxkOm5vdCg6Zmlyc3QtY2hpbGQpIHtcbiAgbWFyZ2luLWxlZnQ6IDMycHg7XG59XG5cbi5tYXQtZm9ybS1maWVsZDpmaXJzdC1jaGlsZCB7XG4gIHdpZHRoOiAxMDBweDtcbn1cblxuLnJlc3VsdCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiAyMHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi10b3A6IDMwcHggIWltcG9ydGFudDtcbn1cblxuLnJlc3VsdC12YWx1ZSB7XG4gIGZvbnQtc2l6ZTogMzZweDtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG5cbi5mb290ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMzBweDtcbiAgbGVmdDogY2FsYyg1MCUgLSAyMDBweCk7XG4gIHdpZHRoOiA0MDBweDtcbiAgZm9udC1mYW1pbHk6IFwiQ2FsaWJyaVwiLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGNvbG9yOiAjNTgzMTliO1xuICB0ZXh0LXNoYWRvdzogMHB4IDFweCAwcHggcmdiYSgyMDAsIDIwMCwgMjAwLCAwLjEpLCAwcHggLTFweCAwcHggcmdiYSgwLCAwLCAwLCAwLjcpO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");




let AppComponent = class AppComponent {
    constructor(http, fb) {
        this.http = http;
        this.fb = fb;
        this.currencyForm = this.fb.group({
            amount: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].min(1)]],
            from: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            to: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]]
        });
    }
    ngOnInit() {
        this.getExchangeratesRates();
    }
    getExchangeratesRates() {
        this.http
            .get("https://api.nbp.pl/api/exchangerates/tables/A")
            .subscribe(res => (this.exchangeratesRates = [
            { currency: "złoty polski", code: "PLN", mid: 1 },
            ...res[0].rates
        ]));
    }
    submitHandler() {
        const amount = this.currencyForm.get("amount").value;
        const from = this.currencyForm.get("from").value;
        const to = this.currencyForm.get("to").value;
        this.beginingAmount = amount;
        this.result = Math.floor(((amount * from.mid) / to.mid) * 100) / 100;
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-root",
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm2015/input.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm2015/card.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm2015/button.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm2015/radio.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/esm2015/divider.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm2015/select.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm2015/icon.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _helpers_add_json_interceptor__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./_helpers/add-json.interceptor */ "./src/app/_helpers/add-json.interceptor.ts");















Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["enableProdMode"])();
let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"]],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClientModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_8__["MatRadioModule"],
            _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__["MatDividerModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_10__["MatSelectModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"]
        ],
        providers: [
            { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HTTP_INTERCEPTORS"], useClass: _helpers_add_json_interceptor__WEBPACK_IMPORTED_MODULE_14__["AddJsonInterceptor"], multi: true }
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Paweł\Documents\Projects\currency-converter\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map