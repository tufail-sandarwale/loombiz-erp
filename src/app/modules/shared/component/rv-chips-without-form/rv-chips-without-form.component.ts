import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedMaterialModules } from '../../modules/shared-material-modules';
import { SharedFormFmodules } from '../../modules/shared-form-modules';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-rv-chips-without-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, SharedMaterialModules, SharedFormFmodules],
  templateUrl: './rv-chips-without-form.component.html',
  styleUrl: './rv-chips-without-form.component.scss'
})
export class RvChipsWithoutFormComponent implements OnInit, OnChanges {
  @Input() label;
  @Input() currentTags;
  @Output() chipEvent = new EventEmitter<any>();
  tags: string[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);
  ngOnInit(): void {
    this.tags = [];
    if (this.currentTags && this.currentTags.length > 0) {
      this.tags = this.currentTags;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tags = [];
    if (this.currentTags && this.currentTags.length > 0) {
      this.tags = this.currentTags;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
    this.chipEvent.emit(this.tags);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
      this.chipEvent.emit(this.tags);
    }
  }

}
