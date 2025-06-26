import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#1a1a2e",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#e0e0e0",
    marginBottom: 50,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  input: {
    width: "100%",
    maxWidth: 350,
    padding: 15,
    borderWidth: 1,
    borderColor: "#4a4a6e",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#2a2a4e",
    color: "#ffffff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  touchableButton: {
    width: "100%",
    maxWidth: 350,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: "#0f4c75",
  },
  secondaryButton: {
    backgroundColor: "#3282b8",
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    fontSize: 16,
  },
});

export default styles;
