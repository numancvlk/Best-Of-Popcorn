import { StyleSheet, Dimensions } from "react-native";
import {
  Colors,
  FontSize,
  Spacing,
  BorderRadius,
  Shadows,
} from "../styles/GlobalStyles";

const { width } = Dimensions.get("window");
const backdropHeight = width * 0.5625;
const posterWidth = width * 0.35;
const posterHeight = posterWidth * 1.5;

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
    padding: Spacing.medium,
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
    padding: Spacing.medium,
  },
  errorText: {
    fontSize: FontSize.large,
    color: Colors.error,
    textAlign: "center",
    marginBottom: Spacing.medium,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    borderRadius: BorderRadius.small,
    ...Shadows.medium,
  },
  backButtonText: {
    color: Colors.textHighlight,
    fontSize: FontSize.medium,
    fontWeight: "bold",
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

  backdropImage: {
    width: "100%",
    height: backdropHeight,
    resizeMode: "cover",
  },

  posterContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: Spacing.medium,
    marginTop: -posterHeight / 2,
    zIndex: 5,
  },
  posterImage: {
    width: posterWidth,
    height: posterHeight,
    borderRadius: BorderRadius.medium,
    borderWidth: 2,
    borderColor: Colors.border,
    ...Shadows.medium,
  },
  noPosterContainer: {
    width: posterWidth,
    height: posterHeight,
    borderRadius: BorderRadius.medium,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.medium,
  },
  noPosterText: {
    color: Colors.textSecondary,
    fontSize: FontSize.small,
    textAlign: "center",
    fontWeight: "bold",
  },

  infoContainer: {
    padding: Spacing.medium,
    paddingTop: Spacing.small,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: FontSize.xLarge,
    fontWeight: "bold",
    color: Colors.textHighlight,
    marginBottom: Spacing.xSmall,
  },
  tagline: {
    fontSize: FontSize.medium,
    fontStyle: "italic",
    color: Colors.textSecondary,
    marginBottom: Spacing.small,
  },
  detailText: {
    fontSize: FontSize.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xSmall,
  },
  overviewTitle: {
    fontSize: FontSize.large,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: Spacing.medium,
    marginBottom: Spacing.small,
  },
  overviewText: {
    fontSize: FontSize.medium,
    color: Colors.textSecondary,
    lineHeight: FontSize.medium * 1.4,
    marginBottom: Spacing.large,
  },

  addReviewContainer: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.medium,
    padding: Spacing.medium,
    marginBottom: Spacing.large,
    ...Shadows.medium,
  },
  addReviewTitle: {
    fontSize: FontSize.large,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: Spacing.medium,
    textAlign: "center",
  },
  ratingInput: {
    backgroundColor: Colors.inputBackground,
    color: Colors.textPrimary,
    borderRadius: BorderRadius.small,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.xSmall,
    fontSize: FontSize.medium,
    marginBottom: Spacing.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  commentTextInput: {
    backgroundColor: Colors.inputBackground,
    color: Colors.textPrimary,
    borderRadius: BorderRadius.small,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
    fontSize: FontSize.medium,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: Spacing.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.medium,
    borderRadius: BorderRadius.small,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.medium,
  },
  submitButtonText: {
    color: Colors.textHighlight,
    fontSize: FontSize.medium,
    fontWeight: "bold",
  },

  commentContainer: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.medium,
    padding: Spacing.medium,
    marginBottom: Spacing.small,
    ...Shadows.medium,
  },
  commentAuthor: {
    fontSize: FontSize.medium,
    fontWeight: "bold",
    color: Colors.textHighlight,
    marginBottom: Spacing.xSmall,
  },
  commentText: {
    fontSize: FontSize.medium,
    color: Colors.textSecondary,
    lineHeight: FontSize.medium * 1.3,
    marginBottom: Spacing.xSmall,
  },
  commentDate: {
    fontSize: FontSize.small,
    color: Colors.textSecondary,
    textAlign: "right",
  },
  noCommentsText: {
    fontSize: FontSize.medium,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingVertical: Spacing.medium,
  },
  sectionTitle: {
    fontSize: FontSize.large,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: Spacing.medium,
    marginBottom: Spacing.small,
  },
});

export default styles;
