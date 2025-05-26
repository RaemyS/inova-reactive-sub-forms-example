import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {Category, MyFancyCustomControlModel} from './my-fancy-custom-control.model';

/**
 * Modelldefinition für die Reactive Form (Layer1: Root)
 */
export interface MyFancyRootFormModel {
  text1: FormControl<string | null>;
  text2: FormControl<string | null>;
  subFormItems: FormArray<FormGroup<MyFancySubFormModel>>;
}

/**
 * Modelldefinition für die Reactive Form (Layer2: dynamische SubForms)
 */
export interface MyFancySubFormModel {
  subText1: FormControl<string | null>;
  subText2: FormControl<string | null>;
  categoryWithDescription: FormControl<MyFancyCategoryAndDescriptionFormModel | null>;
}

/**
 * Modelldefinition für die Reactive Form (Layer3: custom CVA-Component innerhalb jeder SubForm)
 */
export interface MyFancyCategoryAndDescriptionFormModel {
  category: FormControl<Category | null>;
  description: FormControl<string | null>;
}

/**
 * Custom Validierung, damit die custom CVA-Component auch innerhalb der zentralen Reactive Form validiert werden kann.
 * @param control
 */
export const categoryAndDescriptionValidator: ValidatorFn = (control: AbstractControl<MyFancyCustomControlModel | null>) => {
  const value = control.value;

  const isCategorySet = !!value?.category;
  const isDescriptionSet = !!value?.description?.trim();

  return isCategorySet && isDescriptionSet
    ? null
    : {requiredFields: {category: !isCategorySet, description: !isDescriptionSet}};
}

/**
 * Hilfsfunktion um zu entscheiden, ob eine Fehlermeldung angezeigt werden muss oder nicht.
 * @param control
 */
export const showError = (control: AbstractControl | null) => {
  return control?.invalid && (control.dirty || control.touched);
}
