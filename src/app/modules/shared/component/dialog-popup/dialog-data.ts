export interface DialogData {
      
          type: 'product' | 'category' | 'productSubCategory' | 'itemName' | 'tax';
        fields: Field[];
        title: string;
      
}

interface Field {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
  }