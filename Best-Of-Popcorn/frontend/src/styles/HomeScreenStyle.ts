import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const itemWidth = (width - 60) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a5e",
    backgroundColor: "#2a2a4e",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e0e0e0",
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#e74c3c",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
  },
  loadingText: {
    color: "#e0e0e0",
    fontSize: 18,
    marginTop: 10,
  },

  movieGridList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 15,
  },
  movieGridItem: {
    width: itemWidth,
    backgroundColor: "#2a2a4e",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    paddingBottom: 10,
  },
  gridPosterImage: {
    width: itemWidth,
    height: itemWidth * 1.5,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  gridNoPosterContainer: {
    width: itemWidth,
    height: itemWidth * 1.5,
    backgroundColor: "#3a3a5e",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  gridNoPosterText: {
    color: "#a0a0a0",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  gridMovieInfo: {
    paddingHorizontal: 10,
    paddingTop: 10,
    width: "100%",
  },
  gridMovieTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#f9f9f9",
    marginBottom: 5,
    textAlign: "center",
  },
  gridMovieDetails: {
    fontSize: 12,
    color: "#a0a0a0",
    marginBottom: 2,
    textAlign: "center",
  },
});

export default styles;
