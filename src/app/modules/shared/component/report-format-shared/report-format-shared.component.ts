import { Component, Input, Output, EventEmitter,OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TemplateRenderItem {
  label: string;
  imageUrl: string;
  type: string;
  templateName: string;
}

@Component({
  selector: 'app-report-format-shared',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-format-shared.component.html',
  styleUrl: './report-format-shared.component.scss',
})
export class ReportFormatSharedComponent implements OnChanges {
  @Input() typeList: string[] = [];
  @Input() templates: TemplateRenderItem[] = [];
   @Input() templateGroup: string = '';
  @Input() selectedTemplateName: string = '';
  @Output() templateChange = new EventEmitter<string>();
  selectedTemplate: string  = '';
  selectedType: string = '';

ngOnChanges(changes: SimpleChanges): void {

  if (changes['typeList'] && this.typeList.length > 0 && !this.selectedType) {
    this.selectedType = this.typeList[0];
  }

  if (changes['selectedTemplateName'] && this.selectedTemplateName) {
  this.selectedTemplate = this.selectedTemplateName;

  const matched = this.templates.find(
    t => t.templateName === this.selectedTemplateName
  );
  if (matched) {
    this.selectedType = matched.type;
  }
}

}


  onSelect(templateName: string): void {
    this.selectedTemplate = templateName;
    this.templateChange.emit(templateName);
  }

  getTemplatesByType(type: string): TemplateRenderItem[] {
  return this.templates.filter(t => t.type === type);
}
  get filteredTemplates(): TemplateRenderItem[] {
    return this.templates.filter((t) => t.type === this.selectedType);
  }

  
}
