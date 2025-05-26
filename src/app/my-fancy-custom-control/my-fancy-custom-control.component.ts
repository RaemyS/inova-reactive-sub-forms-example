import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Category, MyFancyCustomControlModel} from '../models/my-fancy-custom-control.model';
import {BehaviorSubject} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-my-fancy-custom-control',
  imports: [
    FormsModule,
    AsyncPipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MyFancyCustomControlComponent,
      multi: true
    }
  ],
  templateUrl: './my-fancy-custom-control.component.html',
  styleUrl: './my-fancy-custom-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyFancyCustomControlComponent implements ControlValueAccessor {

  /**
   * zentrale Datenhaltung für die Komponente.
   * Unabhängig, ob später in Template- oder Reactive-Form eingesetzt.
   */
  readonly value$ = new BehaviorSubject<MyFancyCustomControlModel>({
    category: null,
    description: null
  });

  // *********** Start CVA-Interface Implementierung ***********
  private onChange = (_: MyFancyCustomControlModel | null) => {};
  private onTouched = () => {};

  writeValue(value: MyFancyCustomControlModel | null): void {
    this.value$.next(value ?? {
      category: null,
      description: null
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // *********** Ende CVA-Interface Implementierung ***********

  onCategoryChange(category: Category | null) {
    this.emit({...this.value$.value, category});
  }

  onDescriptionChange(description: string | null) {
    this.emit({...this.value$.value, description});
  }

  /**
   * Wir wollen hier dasselbe Verhalten, wie in den restlichen Form-Komponenten:
   * Sobald ein Benutzer einmal in eines der Felder geklickt hat, ist die ganze Komponente dirty.
   */
  onBlur() {
    this.onTouched();
  }

  /**
   * Wenn eines der beiden Felder einen neuen Wert erhält, setzen wir diesen intern und propagieren den Change nach aussen.
   * @param value der neue Wert.
   * @private
   */
  private emit(value: MyFancyCustomControlModel) {
    this.value$.next(value);
    this.onChange(value);
    this.onTouched();
  }
}
