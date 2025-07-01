export interface GstCustomer {
    gstIn: number;
    statecode: number;
    deliveryAddress: {
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
    remarks: string;
  }
  