export type HomeTabParamList = {
  MovieScreen: undefined;
  ActorScreen: undefined;
  AdminPanel: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  MovieDetail: { movieId: number };
  ActorDetail: { actorId: number };
};
