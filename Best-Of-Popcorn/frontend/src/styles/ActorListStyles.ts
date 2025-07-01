import { StyleSheet } from "react-native";
import { Colors } from "../styles/GlobalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  actorCard: {
    flex: 1,
    margin: 5,
    backgroundColor: Colors.card,
    borderRadius: 8,
    alignItems: "center",
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actorImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  actorName: {
    color: Colors.textHighlight,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  actorPopularity: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  noImageContainer: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchBar: {
    height: 50,
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  emptyListText: {
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
});

export default styles;
