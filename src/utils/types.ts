export type userDetailsProps = {
    id: string;
    name: string;
    email: string;
    phone: string;
    place: string;
    isSubscribed: boolean;
    subscriptionEnd?: any;
    borrowedBooks?: Array<{
      borrowId: string;
      bookId: string;
      borrowDate: string;
    }>;
    bookRequests?: any[];
  };

  type DeliveryDetails = {
    name: string;
    address1:string;
    address2: string;
    city: string;
    state: string;
    pincode: number;
    mobile: number;
  };
  
  type User = {
    _id: string;
    name: string;
    phonenumber: number;
    place: string;
    email: string;
    isSubscribed: boolean; // Replace 'any' with the actual type if available
  };
  
  type Product = {
    _id: string;
    title: string;
    author: string;
    genre: string[];
    availability: number;
    country: string;
    description: string;
    discount: number;
    language: string;
    price: number;
    sale: boolean;
  };
  
  type OrderProduct = {
    productId: Product;
    quantity: number;
    _id: string;
  };


  export type OrderProps = {
    orderId:String;
    deliveryDetails: DeliveryDetails;
    _id: string;
    userId: User;
    paymentMethod: string;
    products: OrderProduct[];
    amount: number;
    Total: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };