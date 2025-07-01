import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {
  addressFields= [
    { name: 'street', label: 'Street', type: 'text', visible: true },
    { name: 'area', label: 'Area', type: 'text', visible: true },
    { name: 'city', label: 'City', type: 'text' , visible: true},
    { name: 'pincode', label: 'Pincode', type: 'text', visible: true },
    { name: 'state', label: 'State', type: 'text' , visible: true},
    { name: 'country', label: 'Country', type: 'text', visible: true }
  ];
  fieldConfigurations: any = {
    basicCustomer: [
      { name: 'customerId', label: 'Customer Id', type: 'text', visible: true },
      { name: 'customerName', label: 'Customer Name', type: 'text', visible: true },
      { name: 'contactPerson', label: 'Contact Person', type: 'text', visible: true },
      { name: 'salutation', label: 'Salutation', type: 'text', visible: true },
      { name: 'firstName', label: 'First Name', type: 'text', visible: true },
      { name: 'middleName', label: 'Middle Name', type: 'text', visible: true },
      { name: 'lastName', label: 'Last Name', type: 'text', visible: true },
      { name: 'spouseName', label: 'Spouse Name', type: 'text', visible: true },
      { name: 'profession', label: 'Profession', type: 'text', visible: true },
      { name: 'address', label: 'Address', type: 'text', visible: true },
      { name: 'street', label: 'Street', type: 'text', visible: true },
      { name: 'area', label: 'Area', type: 'text', visible: true },
      { name: 'city', label: 'City', type: 'text', visible: true },
      { name: 'pincode', label: 'Pincode', type: 'text', visible: true },
      { name: 'state', label: 'State', type: 'text', visible: true },
      { name: 'country', label: 'Country', type: 'text', visible: true },
      { name: 'telephoneNo', label: 'Telephone No', type: 'text', visible: true },
      { name: 'isd', label: 'ISD', type: 'text', visible: true },
      { name: 'mobileNo', label: 'Mobile No', type: 'text', visible: true },
      { name: 'email', label: 'Email', type: 'text', visible: true },
      { name: 'whatsappNo', label: 'WhatsApp No', type: 'text', visible: true },
      { name: 'birthday', label: 'Birthday', type: 'datepicker', visible: true, datepicker:'date' },
      { name: 'anniversary', label: 'Anniversary', type: 'datepicker', visible: true ,datepicker:'date'},
      { name: 'category', label: 'Category', type: 'text', visible: true },
      { name: 'photo', label: 'Photo', type: 'text', visible: false,photo:'photo' },
      { name: 'receiveWhatsapp', label: 'Receive WhatsApp', type: 'select', visible: true, },
      { name: 'preferredCommunicationMode', label: 'Preferred Communication Mode', type: 'select', visible: true, multiple:true },
      { name: 'referredBy', label: 'Referred By', type: 'text', visible: true },
      { name: 'gstSettings', label: 'GST Settings', type: 'text', visible: true },
      { name: 'accountsSettings', label: 'Accounts Settings', type: 'select', visible: true,select:'select' },
      { name: 'crmMembershipSettings', label: 'CRM Membership Settings', type: 'select', visible: true, select:'select'},
      { name: 'remarks', label: 'Remarks', type: 'text', visible: true },
     // { fields: this.addressFields },   
    ],
   
      gstCustomer: [
        { name: 'customerId', label: 'Customer ID', type: 'text', visible: true },
        { name: 'customerName', label: 'Customer Name', type: 'text', visible: true },
        { name: 'pan', label: 'PAN', type: 'text', visible: true },
        { name: 'registrationType', label: 'Registration Type', type: 'text', visible: true },
        { name: 'gstinUin', label: 'GSTIN/UIN', type: 'text', visible: true },
        { name: 'placeOfSupply', label: 'Place of Supply', type: 'text', visible: true },
        { name: 'stateCode', label: 'State Code', type: 'text', visible: false },
        { name: 'remarks', label: 'Remarks', type: 'text', visible: false },
        
    ],
    accountCustomer: [
      { name: 'customerName', label: 'Customer Name', type: 'text', visible: true},
    { name: 'customerId', label: 'Customer ID', type: 'text', visible: true },
    { name: 'openingBalance', label: 'Opening Balance', type: 'text', visible: true},
    { name: 'creditDebitBalance', label: 'Credit/Debit Balance', type: 'text' },
    { name: 'creditSale', label: 'Credit Sale', type: 'text',visible: true },
    { name: 'creditDues', label: 'Credit Dues', type: 'text', visible: true},
    { name: 'creditLimit', label: 'Credit Limit', type: 'text' ,visible: true},
    { name: 'billingType', label: 'Billing Type', type: 'text', visible: true},
    { name: 'markup', label: 'Markup', type: 'text' ,visible: true},
    { name: 'markdown', label: 'Markdown', type: 'text', visible: true},
    { name: 'billDiscount', label: 'Bill Discount', type: 'text', visible: true},
    { name: 'productWiseDiscount', label: 'Product Wise Discount', type: 'text',visible: true },
    
    { name: 'telephoneNo', label: 'Telephone No', type: 'text', visible: true },
    { name: 'isd', label: 'ISD', type: 'text' , visible: true},
    { name: 'mobileNo', label: 'Mobile No', type: 'text', visible: true },
    { name: 'email', label: 'Email', type: 'text', visible: true},
    { name: 'remarks', label: 'Remarks', type: 'text', visible: true },
    

    { name: 'deliveryTelephoneNo', label: 'Delivery Telephone No', type: 'text', visible: true },
    { name: 'deliveryIsd', label: 'Delivery ISD', type: 'text' , visible: true},
    { name: 'deliveryMobileNo', label: 'Delivery Mobile No', type: 'text', visible: true },
    { name: 'deliveryEmail', label: 'Delivery Email', type: 'text', visible: true },
    { name: 'remarks', label: 'Remarks', type: 'text' , visible: true}
    ]
  };
  constructor() { }
}
