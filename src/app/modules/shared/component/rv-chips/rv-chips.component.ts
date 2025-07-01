import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormFmodules } from '../../modules/shared-form-modules';
import { SharedMaterialModules } from '../../modules/shared-material-modules';
import { MatFormFieldModule } from '@angular/material/form-field';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rv-chips',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, SharedMaterialModules, SharedFormFmodules],
  templateUrl: './rv-chips.component.html',
  styleUrl: './rv-chips.component.scss'
})

export class RvChipsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() formElement: any;
  tags: string[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
      this.parentForm.controls[this.formElement.name].setValue(this.tags);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
      this.parentForm.controls[this.formElement.name].setValue(this.tags);
    }
  }
//   edit(tag: string, event: MatChipEditedEvent) {
//     const value = event.value.trim();
//     if (!value) {
//       this.remove(tag);
//       return;
//     }

//     const index = this.tags.indexOf(tag);
//     if (index >= 0) {
//       this.fruits[index].name = value;
//     }
//   }
 }
