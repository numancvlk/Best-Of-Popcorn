import { StyleSheet } from "react-native";

const stlyes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  loadingText: {
    marginTop: 10,
    color: "#e74c3c",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  backIconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backdropImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },

  posterContainer: {
    position: "absolute",
    top: 180,
    left: 20,
    zIndex: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,
  },
  posterImage: {
    width: 130,
    height: 200,
    resizeMode: "cover",
  },
  noPosterContainer: {
    width: 130,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  noPosterText: {
    color: "#bbb",
    textAlign: "center",
  },

  infoContainer: {
    marginTop: 130,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1a1a1a",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tagline: {
    color: "#ccc",
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },
  detailText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
  },
  overviewTitle: {
    color: "#e74c3c",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  overviewText: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default stlyes;
