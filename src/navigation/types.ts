export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  SignUp: undefined;
  SignIn: undefined;
  PhoneAuth: { mode?: 'signup' | 'signin' } | undefined;
  Home: undefined;
  AiBooking: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  AiTab: undefined;
  ProTab: undefined;
  AdminTab: undefined;
};
