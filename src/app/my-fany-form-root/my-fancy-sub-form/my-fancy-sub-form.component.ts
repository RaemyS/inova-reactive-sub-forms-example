import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MyFancySubFormModel, showError} from '../../models/my-fancy-form.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MyFancyCustomControlComponent} from '../../my-fancy-custom-control/my-fancy-custom-control.component';

/**
 * Komponente, welche genau nur als Sub-Form innerhalb einer Reactive Form Sinn ergibt.
 */
@Component({
  selector: 'app-my-fancy-sub-form',
  imports: [
    ReactiveFormsModule,
    MyFancyCustomControlComponent,
  ],
  templateUrl: './my-fancy-sub-form.component.html',
  styleUrl: './my-fancy-sub-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyFancySubFormComponent {

  /**
   * Die Komponente ist stark zweckgebunden und macht nur innerhalb einer Reactive Form Sinn.
   * Daher übergeben wir den Kontext der Parent-Form direkt als Input.
   */
  @Input({required: true})
  item!: FormGroup<MyFancySubFormModel>;

  /**
   * Getter, um direkten Zugriff auf das Control der FormGroup zu erhalten.
   */
  get itemFormControls() {
    return this.item.controls;
  }

  protected showError = showError;
}
