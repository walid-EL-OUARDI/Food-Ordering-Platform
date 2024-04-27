export interface Function {
  [key: string]: () => Promise<void>;
}
export interface UserState {
  clientData: User;
  token?: string | null;
  isAuthenticated?: boolean | null;
}
export interface RestaurantState {
  restaurantData: Restaurant;
}
export interface User {
  name: string;
  email: string;
  address?: string;
  country?: string;
  city?: string;
}
export interface Menu {
  name: string;
  price: number;
}
export interface Restaurant {
  id: number;
  name: string;
  country: string;
  city: string;
  delivery_price: number;
  estimated_delivery_time: number;
  cuisines: [string, ...string[]];
  menus: Menu[];
  image_url: string;
}

export interface getRestaurantsResponse {
  restaurants: Restaurant[];
  meta: {
    total: number;
    pages: number;
    page: number;
  };
}
export interface UserLoginCredentials {
  email: string;
  password: string;
}
export interface UserRegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
