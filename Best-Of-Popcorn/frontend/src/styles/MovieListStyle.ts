import { StyleSheet, Dimensions } from "react-native";
import {
  Colors,
  FontSize,
  Spacing,
  BorderRadius,
  Shadows,
} from "../styles/GlobalStyles";

const { width } = Dimensions.get("window");
const itemHorizontalPadding = Spacing.xSmall;
const gridColumnGap = Spacing.small;
const gridRowGap = Spacing.medium;
const numColumns = 2;

const calculatedItemWidth =
  (width - Spacing.small * 2 - gridColumnGap) / numColumns;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.small,
  },
  loadingContainer: {
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: Spacing.large,
  },
  errorText: {
    fontSize: FontSize.medium,
    color: Colors.error,
    textAlign: "center",
  },

  movieGridList: {
    paddingVertical: Spacing.medium,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: gridRowGap,
  },

  movieGridItem: {
    width: calculatedItemWidth,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.medium,
    overflow: "hidden",
    ...Shadows.medium,
  },

  gridPosterImage: {
    width: "100%",
    height: calculatedItemWidth * 1.5,
    resizeMode: "cover",
    borderTopLeftRadius: BorderRadius.medium,
    borderTopRightRadius: BorderRadius.medium,
  },

  gridNoPosterContainer: {
    width: "100%",
    height: calculatedItemWidth * 1.5,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: BorderRadius.medium,
    borderTopRightRadius: BorderRadius.medium,
  },

  gridNoPosterText: {
    color: Colors.textSecondary,
    fontSize: FontSize.small,
    textAlign: "center",
  },

  gridMovieInfo: {
    padding: Spacing.small,
  },

  gridMovieTitle: {
    fontSize: FontSize.medium,
    fontWeight: "bold",
    color: Colors.textHighlight,
    marginBottom: Spacing.xSmall,
  },

  gridMovieDetails: {
    fontSize: FontSize.small,
    color: Colors.textSecondary,
  },
});

export default styles;
