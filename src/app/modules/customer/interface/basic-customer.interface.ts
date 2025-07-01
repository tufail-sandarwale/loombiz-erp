export interface BasicCustomer {
    customerName: string | string[];
    customerId: string;
    openingBalance: string;
    creditDebitBalance: string;
    creditSale: string;
    creditDues: string;
    creditLimit: string;
    billingType: string;
    markup: string;
    markdown: string;
    billDiscount: string;
    productWiseDiscount: string;
    billingAddress: {
      street: string;
      area: string;
      city: string;
      pincode: string;
      state: string;
      country: string;
    };
    telephoneNo: string;
    isd: string;
    mobileNo: string;
    email: string;
    deliveryAddress: {
      street: string;
      area: string;
      city: string;
      pincode: string;
      state: string;
      country: string;
    };
    deliveryTelephoneNo: string;
    deliveryIsd: string;
    deliveryMobileNo: string;
    deliveryEmail: string;
    remarks: string;
  }
  