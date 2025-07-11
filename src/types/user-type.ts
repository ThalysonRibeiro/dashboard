export type ProfileType = {
  id: string;
  status: string;
  type: "useradmin" | "userdefault" | "usermoderator";
  name: string;
  cpf_or_cnpj: string;
  gender: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  resetPasswordToken: string;
  resetPasswordExpires: string;
  emailVerified: Date;
  emailVerificationToken: string;
  googleId: string;
  avatar: string;
  acceptOffers: boolean;
  acceptTerms: boolean;
  documentType: string;
  createdAt: Date;
  updatedAt: Date;
  // orderItem: OrderItemsProps[];
  // order: OrderProps[];
  // addresses: AddressProps[];
  // reviews: ReviewProps[];
  // wishlist: WishlistProps;
  // cart: CartProps;
}