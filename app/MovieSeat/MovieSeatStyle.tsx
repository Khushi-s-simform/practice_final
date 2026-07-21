import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  seatcard: {
    borderRadius: 5,
    backgroundColor: "#d3d0d0",
    justifyContent: "center",
    padding: 20,
    margin: 5,
  },
  available: {
    backgroundColor: "green",
  },
  selected: {
    backgroundColor: "blue",
  },
  booked: {
    backgroundColor: "red",
  },
  Bookbtn: {
    backgroundColor: "blue",
    width: 250,
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 20,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  summaryContainer: {
    marginTop: 20,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  seatTextContainer: {
    flexDirection: "row",
  },
  seatText: {
    fontSize: 16,
    marginBottom: 6,
  },
  selectedSeatContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  selectedSeatChip: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  selectedSeatText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    fontStyle: "italic",
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
  },
});

export default styles;
