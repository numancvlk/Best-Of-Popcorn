import { StyleSheet } from "react-native";
import {
  Colors,
  FontSize,
  Spacing,
  BorderRadius,
  Shadows,
} from "../styles/GlobalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: Spacing.large,
  },
  title: {
    fontSize: FontSize.xxLarge,
    fontWeight: "bold",
    color: Colors.textHighlight,
    marginBottom: Spacing.xLarge,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: Colors.inputBackground,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.large,
    borderRadius: BorderRadius.medium,
    fontSize: FontSize.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  touchableButton: {
    width: "100%",
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    alignItems: "center",
    marginBottom: Spacing.medium,
    ...Shadows.light,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonText: {
    color: Colors.textHighlight,
    fontSize: FontSize.large,
    fontWeight: "bold",
  },
  loginText: {
    color: Colors.primary,
    fontSize: FontSize.medium,
  },
});

export default styles;
