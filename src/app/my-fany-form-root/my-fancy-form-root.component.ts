import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  categoryAndDescriptionValidator,
  MyFancyCategoryAndDescriptionFormModel,
  MyFancyRootFormModel,
  MyFancySubFormModel,
  showError
} from '../models/my-fancy-form.model';
import {MyFancySubFormComponent} from './my-fancy-sub-form/my-fancy-sub-form.component';
import {JsonPipe} from '@angular/common';

/**
 * Root-Komponente enthält eine Reactive Form, mit dynamischen SubForms und jeweils einer custom CVA-Component.
 */
@Component({
  selector: 'app-my-fany-form-root',
  imports: [
    ReactiveFormsModule,
    MyFancySubFormComponent
  ],
  templateUrl: './my-fancy-form-root.component.html',
  styleUrl: './my-fancy-form-root.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyFancyFormRootComponent {
  private readonly formBuilder= inject(FormBuilder);

  /**
   * Die Root der Reactive Form
   */
  form = this.formBuilder.group<MyFancyRootFormModel>({
    text1: new FormControl('', Validators.required),
    text2: new FormControl('', Validators.required),
    subFormItems: this.formBuilder.array(this.buildSubFormItems(2))   // Hier gelangen wir eine Ebene tiefer in eine dynamische Liste von SubFormItems
  });

  /**
   * Getter, um direkten Zugriff auf die Liste der SubFormItems zu erhalten.
   */
  get subFormItems(): FormArray<FormGroup<MyFancySubFormModel>> {
    return this.form.get('subFormItems') as FormArray<FormGroup<MyFancySubFormModel>>;
  }

  protected showError = showError;

  /**
   * Speicherfunktion die erst etwas bewirkt, wenn die gesamte Form valide ist.
   * Prüfung ist nur zur Sicherheit, da bereits via disabled im Template abgefedert.
   */
  onSave() {
    if (this.form.invalid) {
      return;
    }

    // Hier würde man die Form-Values in die API-Models mappen und absenden.
    alert(`Save!\r\n${new JsonPipe().transform(this.form.value)}`);
  }

  /**
   * Eine definierte Anzahl an SubFormItems für die Root-Form erstellen.
   * @param subFormCount gewünschte Anzahl an SubFormItems
   * @private
   */
  private buildSubFormItems(subFormCount: number) {
    return Array.from({length: subFormCount}, () => this.formBuilder.group<MyFancySubFormModel>({
      subText1: new FormControl('', Validators.required),
      subText2: new FormControl('', Validators.required),
      // Da die Kategorie und Beschreibung innerhalb einer custom CVA-Component umgesetzt ist,
      // benötigen wir hier einen speziellen Validator, um beide Werte hier in der Root-Form zu prüfen.
      // Eine andere Option wäre, das Validator-Interface direkt in der CVA-Component zu implementieren (und somit die Validierung dem Child anzuvertrauen).
      categoryWithDescription: new FormControl<MyFancyCategoryAndDescriptionFormModel | null>(null,  [Validators.required, categoryAndDescriptionValidator])
    }))
  }
}
