import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  Colors,
  FontSize,
  Spacing,
  BorderRadius,
  Shadows,
} from "../styles/GlobalStyles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === "android" ? Spacing.large : 0,
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
  headerTitle: {
    fontSize: FontSize.xxLarge,
    fontWeight: "bold",
    color: Colors.textHighlight,
    textAlign: "center",
    paddingVertical: Spacing.medium + (Platform.OS === "ios" ? 10 : 0),
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadows.medium,
  },
  listContent: {
    padding: Spacing.medium,
  },
  userItem: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.large,
    padding: Spacing.medium,
    marginBottom: Spacing.medium,
    ...Shadows.medium,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  userInfo: {
    width: "100%",
    marginBottom: Spacing.small,
  },
  userLabel: {
    fontSize: FontSize.medium,
    color: Colors.textPrimary,
    fontWeight: "bold",
    marginBottom: Spacing.xSmall / 2,
  },
  userValue: {
    fontSize: FontSize.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.xSmall / 2,
  },
  userTextLast: {
    marginBottom: 0,
  },
  userRole: {
    fontWeight: "bold",
    color: Colors.textHighlight,
    fontSize: FontSize.medium + 1,
  },
  updateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    borderRadius: BorderRadius.medium,
    ...Shadows.medium,
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  updateButtonText: {
    color: Colors.textHighlight,
    fontSize: FontSize.medium,
    fontWeight: "bold",
    marginLeft: Spacing.xSmall,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    width: width * 0.85,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.large,
    padding: Spacing.large,
    alignItems: "center",
    ...Shadows.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalTitle: {
    fontSize: FontSize.large,
    fontWeight: "bold",
    color: Colors.textHighlight,
    marginBottom: Spacing.medium,
    textAlign: "center",
  },
  picker: {
    width: "100%",
    backgroundColor: Colors.inputBackground,
    color: Colors.textPrimary,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.medium,
    height: 50,
    overflow: "hidden",
  },
  pickerItem: {
    color: Colors.textPrimary,
    fontSize: FontSize.medium,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: Spacing.small,
  },
  button: {
    flex: 1,
    paddingVertical: Spacing.small,
    borderRadius: BorderRadius.medium,
    marginHorizontal: Spacing.xSmall,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.medium,
  },
  buttonClose: {
    backgroundColor: Colors.secondary,
  },
  buttonUpdate: {
    backgroundColor: Colors.primary,
  },
  textStyle: {
    color: Colors.textHighlight,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: FontSize.medium,
  },
});

export default styles;
