import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { CartService } from '../services/cart.service';
import { FormService } from '../services/form.service';
import { CustomValidators } from '../validator/custom-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(public authenticationService: AuthenticationService, private formBuilder: FormBuilder, private formService: FormService, private cartService: CartService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                        [
                        Validators.required,
                        Validators.minLength(3),
                        CustomValidators.notOnlyWhitespace
                        ]),

        lastName: new FormControl('', [Validators.required,
           Validators.minLength(3),
            CustomValidators.notOnlyWhitespace]),

        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        country: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        county: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        zipCode: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        country: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        county: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        zipCode: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        nameOnCard: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        securityCode: new FormControl('', [Validators.required, CustomValidators.notOnlyWhitespace]),
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });

    const startMonth: number = new Date().getMonth() + 1;
    console.log('start month:' + startMonth);

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log('Retrieved credit card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )

    this.formService.getCreditCardYears().subscribe(
      data => {
        console.log('Retrieved credit card years: ' + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName');}
  get lastName() { return this.checkoutFormGroup.get('customer.lastName');}
  get email() { return this.checkoutFormGroup.get('customer.email');}

  get shippingStreet() {return this.checkoutFormGroup.get('shippingAddress.street')};
  get shippingCity() {return this.checkoutFormGroup.get('shippingAddress.city')};
  get shippingCountry() {return this.checkoutFormGroup.get('shippingAddress.country')};
  get shippingCounty() {return this.checkoutFormGroup.get('shippingAddress.county')};
  get shippingZipcode() {return this.checkoutFormGroup.get('shippingAddress.zipCode')};

  
  get billingStreet() {return this.checkoutFormGroup.get('billingAddress.street')};
  get billingCity() {return this.checkoutFormGroup.get('billingAddress.city')};
  get billingCountry() {return this.checkoutFormGroup.get('billingAddress.country')};
  get billingCounty() {return this.checkoutFormGroup.get('billingAddress.county')};
  get billingZipcode() {return this.checkoutFormGroup.get('billingAddress.zipCode')};

  get cardType() {return this.checkoutFormGroup.get('creditCard.cardType')};
  get nameOnCard() {return this.checkoutFormGroup.get('creditCard.nameOnCard')};
  get cardNumber() {return this.checkoutFormGroup.get('creditCard.cardNumber')};
  get securityCode() {return this.checkoutFormGroup.get('creditCard.securityCode')};


  onSubmit() {
    console.log('Handling form submission');
    console.log(this.checkoutFormGroup.get('customer').value);
    if(this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if(currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log('Retrieved credit card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }
}
