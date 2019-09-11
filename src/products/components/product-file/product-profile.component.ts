import {Component, forwardRef, Input} from '@angular/core';
import {ProductProfile} from '../../models/product-profile.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


const PRODUCT_PROFILE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProductProfileComponent),
  multi: true
};

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.scss'],
  providers: [PRODUCT_PROFILE_ACCESSOR]
})
export class ProductProfileComponent implements ControlValueAccessor {

  value: ProductProfile[];
  isDisabled = false;

  private onTouch;
  private onModelChange;

  constructor() {
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(profiles: ProductProfile[]): void {
    this.value = profiles;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  selectedProfile(profile: ProductProfile) {
    if (profile.default) {
      profile.selected = true;
    }
    return profile.selected;
  }

  clickOnProfile(pro: ProductProfile) {
    this.value.map(pp => {
      pp.default = false;
      pp.selected = false;
      if (pro.name === pp.name) {
        pp.default = true;
        pp.selected = true;
      }
      return pp;
    });

    this.onTouch();
    this.onModelChange(this.value);
  }

  showDesc(pro: ProductProfile) {

  }
}
