import { StyleSheet, Platform } from "react-native";
import {
  Colors,
  FontSize,
  Spacing,
  BorderRadius,
  Shadows,
} from "../styles/GlobalStyles";

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.medium,
    paddingTop:
      Platform.OS === "android" ? Spacing.medium + 10 : Spacing.medium,
    paddingBottom: Spacing.small,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadows.light,
  },
  headerTitle: {
    fontSize: FontSize.xLarge,
    fontWeight: "bold",
    color: Colors.textHighlight,
  },
  logoutButton: {
    backgroundColor: Colors.error,
    paddingVertical: Spacing.xSmall,
    paddingHorizontal: Spacing.small,
    borderRadius: BorderRadius.small,
    ...Shadows.light,
  },
  logoutButtonText: {
    color: Colors.textHighlight,
    fontSize: FontSize.medium,
    fontWeight: "600",
  },

  tabBarLabelStyle: {
    fontSize: FontSize.small,
    fontWeight: "bold",
  },
  tabBarStyle: {
    backgroundColor: Colors.card,
    height: 65,
    paddingBottom: Platform.OS === "android" ? Spacing.xSmall : Spacing.xSmall,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.light,
  },

  noRoleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.large,
    backgroundColor: Colors.background,
  },
  noRoleText: {
    fontSize: FontSize.large,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: Spacing.small,
  },
  noRoleSubText: {
    fontSize: FontSize.medium,
    color: Colors.textSecondary,
    textAlign: "center",
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
});

export default styles;
