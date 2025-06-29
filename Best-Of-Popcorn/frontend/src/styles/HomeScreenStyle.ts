import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  noRoleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  noRoleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  noRoleSubText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#e74c3c",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#c0392b",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  movieGridList: {
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-around",
    marginBottom: 10,
  },
  movieGridItem: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  gridPosterImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  gridNoPosterContainer: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  gridNoPosterText: {
    color: "#666",
    fontSize: 16,
  },
  gridMovieInfo: {
    padding: 10,
  },
  gridMovieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  gridMovieDetails: {
    fontSize: 12,
    color: "#555",
  },
});

export default styles;
