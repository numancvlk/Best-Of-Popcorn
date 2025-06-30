import { StyleSheet, Dimensions } from "react-native";
import {
  Colors,
  FontSize,
  Spacing,
  BorderRadius,
  Shadows,
} from "../styles/GlobalStyles";

const { width } = Dimensions.get("window");
const moviePosterWidth = (width - Spacing.medium * 3) / 2.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: Spacing.medium,
    fontSize: FontSize.medium,
    color: Colors.textPrimary,
  },
  errorText: {
    fontSize: FontSize.medium,
    color: Colors.error,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    padding: Spacing.medium,
    paddingTop: Spacing.large * 1.5,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadows.medium,
  },
  backIconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 2,
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4 * 1.5,
    borderRadius: BorderRadius.large,
    marginBottom: Spacing.medium,
    resizeMode: "cover",
    ...Shadows.medium,
  },
  noImageContainer: {
    width: width * 0.4,
    height: width * 0.4 * 1.5,
    borderRadius: BorderRadius.large,
    marginBottom: Spacing.medium,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: Colors.textSecondary,
    fontSize: FontSize.medium,
    textAlign: "center",
    fontWeight: "bold",
  },
  actorName: {
    fontSize: FontSize.xLarge,
    fontWeight: "bold",
    color: Colors.textHighlight,
    textAlign: "center",
    marginTop: Spacing.small,
  },
  section: {
    padding: Spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTitle: {
    fontSize: FontSize.large,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: Spacing.small,
  },
  biographyText: {
    fontSize: FontSize.medium,
    color: Colors.textSecondary,
    lineHeight: FontSize.medium * 1.4,
  },
  movieCreditsContainer: {
    paddingVertical: Spacing.xSmall,
    paddingHorizontal: Spacing.medium,
  },
  movieCard: {
    width: moviePosterWidth,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.medium,
    overflow: "hidden",
    marginRight: Spacing.small,
    ...Shadows.medium,
  },
  moviePoster: {
    width: "100%",
    height: moviePosterWidth * 1.5,
    resizeMode: "cover",
    borderTopLeftRadius: BorderRadius.medium,
    borderTopRightRadius: BorderRadius.medium,
  },
  movieTitle: {
    fontSize: FontSize.small,
    fontWeight: "bold",
    color: Colors.textHighlight,
    paddingHorizontal: Spacing.xSmall,
    paddingTop: Spacing.small,
    marginBottom: Spacing.xSmall,
  },
  movieCharacter: {
    fontSize: FontSize.small,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.xSmall,
    paddingBottom: Spacing.small,
  },
  noMoviesText: {
    fontSize: FontSize.medium,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingVertical: Spacing.medium,
  },
});

export default styles;
