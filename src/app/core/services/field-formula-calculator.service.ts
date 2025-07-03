import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldFormulaCalculatorService {
  udfList=[];
  productForm;
  pricingTaxFormValues = { pricingValues: {}, purchaseTaxId: {}, saleTaxId: {} };
  taxList;
  percentageAttrs = ['wholesaleMargin', 'wholesaleDiscount', 'sellingDiscount', 'sellingMargin', 'purchaseDiscount'];
  constructor() { }

  calculatrePricingOnProdduct() {
    let allAttributes: Set<string> = new Set<string>();
    this.udfList.filter(udf => (udf.formula && udf.formula !== ''))
      .map(udf => {
        let attributes = this.getAttributesFromFormula(udf.formula);
        allAttributes = new Set([...allAttributes, ...attributes]);
      });
    if (allAttributes.size > 0) {
      allAttributes.forEach(attr => {
        if (attr == 'purchaseTax') {
          this.productForm.controls['purchaseTax'].valueChanges.subscribe(value => {
            this.pricingTaxFormValues.purchaseTaxId = value['id'];
            this.calculate(attr);
          });
        }
        else if (attr == "saleTax") {
          this.productForm.controls['saleTax'].valueChanges.subscribe(value => {
            this.pricingTaxFormValues.saleTaxId = value['id'];
            this.calculate(attr);
          });
        } else {
          if (this.percentageAttrs.includes(attr)) {
            if (this.productForm.controls['productPricingAndDiscount'].get(attr)) {
              this.productForm.controls['productPricingAndDiscount'].get(attr).valueChanges.subscribe(value => {
                this.pricingTaxFormValues.pricingValues[attr] = value;
                this.calculate(attr);
              })
            }
            if (this.productForm.controls['productPricingAndDiscount'].get(attr + "Percentage")) {
              this.productForm.controls['productPricingAndDiscount'].get(attr + "Percentage").valueChanges.subscribe(value => {
                this.pricingTaxFormValues.pricingValues[attr + "Percentage"] = value;
                this.calculate(attr);
              })
            }
          } else {
            if (this.productForm.controls['productPricingAndDiscount'].get(attr)) {
              this.productForm.controls['productPricingAndDiscount'].get(attr).valueChanges.subscribe(value => {
                this.pricingTaxFormValues.pricingValues[attr] = value;
                this.calculate(attr);
              })
            }
          }
        }
      })
    }
  }

  private calculate(attr) {
    this.checkUdfContainsAttributeInFormula(attr).forEach(udf => {
      let val = this.replaceValuesInFormula(udf.formula);
      this.productForm.controls['productPricingAndDiscount'].get(udf.code).setValue(val);
    });;
  }

  private checkUdfContainsAttributeInFormula(attribute) {
    return this.udfList.filter(udf => (udf.formula && udf.formula !== ''))
      .filter(udf => {
        let attributes = this.getAttributesFromFormula(udf.formula);
        if (attributes.includes(attribute)) {
          return true;
        } else {
          return false;
        }
      });
  }
  private calculateFormulaAttributes() {
    this.udfList.forEach(udf => {
      if (udf.formula && udf.formula !== '') {
        let val = this.replaceValuesInFormula(udf.formula);
        this.productForm.controls['productPricingAndDiscount'].get(udf.code).setValue(val);
      }
    });
  }

  private getAttributesFromFormula(formula: string): string[] {
    const regex = /[a-zA-Z_]\w*/g;
    let attributes = formula.match(regex);
    return [...new Set(attributes)];
  }

  private replaceValuesInFormula(formula: string): string {
    let attributes = this.getAttributesFromFormula(formula);
    for (const attribute of attributes) {
      let value = this.getValueByAttribute(attribute);
      if ((value || value > -1) && !Number.isNaN(value)) {
        formula = formula.replace(new RegExp(attribute, 'g'), value !== null ? value : 0);
      }
    }
    if (this.getAttributesFromFormula(formula) && this.getAttributesFromFormula(formula).length > 0) {
      return null;
    } else {
      return this.evaluateFormula(formula);
    }

  }

  private evaluateFormula(formula: string): string {
    let result = eval(formula);
    return result && !Number.isNaN(result) ? Number.parseFloat(result).toFixed(2) : null;
  }

  private getValueByAttribute(attribute: string): any {
    if (attribute == 'purchaseTax') {
      const selectedPurchaseTaxId = this.pricingTaxFormValues.purchaseTaxId;
      const purchasePrice = this.pricingTaxFormValues.pricingValues['purchasePrice']
      const selectedPurchaseTax = this.taxList.find(tax => tax.id === selectedPurchaseTaxId)
      return (selectedPurchaseTax) ? ((purchasePrice - this.getPurchaseDiscount()) * (selectedPurchaseTax.rate / 100)) : 0;
    } else if (attribute == 'saleTax') {
      const selectedSaleTaxId = this.pricingTaxFormValues.saleTaxId;
      const sellingPrice = this.pricingTaxFormValues.pricingValues['sallingPrice']
      const selectedSaleTax = this.taxList.find(tax => tax.id === selectedSaleTaxId)
      return selectedSaleTax ? (selectedSaleTax.rate / 100) * sellingPrice : 0;
    } else if (attribute == 'purchaseDiscount') {
      return this.getPurchaseDiscount()
    } else if (attribute == 'sellingMargin') {
      return this.getSellingMargin()
    } else if (attribute == 'sellingDiscount') {
      return this.getSellingDiscount()
    } else if (attribute == 'wholesaleMargin') {
      return this.getWholesaleMargin()
    } else if (attribute == 'wholesaleDiscount') {
      return this.getWholesaleDiscount()
    } else {
      return this.productForm.controls['productPricingAndDiscount'].get(attribute).value;
    }
  }

  private getPurchaseDiscount() {
    let val = 0;
    if (this.pricingTaxFormValues.pricingValues['purchaseDiscountPercentage']) {
      const purchasePrice = this.pricingTaxFormValues.pricingValues['purchasePrice']
      const purchaseDiscountPercentage = this.pricingTaxFormValues.pricingValues['purchaseDiscountPercentage']
      console.log("getPurchaseDiscount", purchasePrice, purchaseDiscountPercentage)
      val = (purchaseDiscountPercentage / 100) * purchasePrice;
      console.log("landing pricing", val);

    } else {
      val = this.pricingTaxFormValues.pricingValues['purchaseDiscount']
    }
    if (val && !Number.isNaN(val)) {
      return val;
    } else {
      return 0
    }
  }

  private getSellingMargin() {
    let val = 0;
    if (this.pricingTaxFormValues.pricingValues['sellingMarginPercentage']) {
      const landingCost = this.pricingTaxFormValues.pricingValues['landingCost']
      const sellingMarginPercentage = this.pricingTaxFormValues.pricingValues['sellingMarginPercentage']
      val = (sellingMarginPercentage / 100) * landingCost;
    } else {
      val = this.pricingTaxFormValues.pricingValues['sellingMargin']
    }
    if (val && !Number.isNaN(val)) {
      return val;
    } else {
      return 0
    }
  }

  private getSellingDiscount() {
    let val = 0;
    if (this.pricingTaxFormValues.pricingValues['sellingDiscountPercentage']) {
      const mrp = this.pricingTaxFormValues.pricingValues['mrp']
      const sellingDiscountPercentage = this.pricingTaxFormValues.pricingValues['sellingDiscountPercentage']
      val = (sellingDiscountPercentage / 100) * mrp;
    } else {
      val = this.pricingTaxFormValues.pricingValues['sellingDiscount']
    }
    if (val && !Number.isNaN(val)) {
      return val;
    } else {
      return 0
    }
  }

  private getWholesaleDiscount() {
    let val = 0;
    if (this.pricingTaxFormValues.pricingValues['wholesaleDiscountPercentage']) {
      const mrp = this.pricingTaxFormValues.pricingValues['mrp']
      const wholesaleDiscountPercentage = this.pricingTaxFormValues.pricingValues['wholesaleDiscountPercentage']
      val = (wholesaleDiscountPercentage / 100) * mrp;
    } else {
      val = this.pricingTaxFormValues.pricingValues['wholesaleDiscount']
    }
    if (val && !Number.isNaN(val)) {
      return val;
    } else {
      return 0
    }
  }

  private getWholesaleMargin() {
    let val = 0;
    if (this.pricingTaxFormValues.pricingValues['wholesaleMarginPercentage']) {
      const landingCost = this.pricingTaxFormValues.pricingValues['landingCost']
      const wholesaleMarginPercentage = this.pricingTaxFormValues.pricingValues['wholesaleMarginPercentage']
      val = (wholesaleMarginPercentage / 100) * landingCost;
    } else {
      val = this.pricingTaxFormValues.pricingValues['wholesaleMargin']
    }
    if (val && !Number.isNaN(val)) {
      return val;
    } else {
      return 0
    }
  }
}
