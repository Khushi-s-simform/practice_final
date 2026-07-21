import React, { useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dummySeat from "./dummySeat";
import styles from "./MovieSeatStyle";

const MovieSeat = () => {
  const [seat, setSeat] = useState(dummySeat);

  const handlePress = (id: number) => {
    const selectedCount = seat.filter((item) => item.selected).length;

    const clickedSeat = seat.find((item) => item.id === id);

    if (!clickedSeat) return;

    if (clickedSeat.booked) return;

    if (!clickedSeat.selected && selectedCount >= 6) {
      Alert.alert("Maximum Seats", "You can only select 6 seats.");
      return;
    }
    const updatedSeats = seat.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });

    setSeat(updatedSeats);
  };
  const selectedSeats = seat.filter((item) => item.selected);

  const handleBook = () => {
    const bookedSeats = seat.map((item) => {
      if (item.selected) {
        return {
          ...item,
          booked: true,
          selected: false,
        };
      }

      return item;
    });

    setSeat(bookedSeats);
  };
  return (
    <SafeAreaView>
      <Text>Movie Seat Booking</Text>

      <View style={{ alignItems: "center" }}>
        <FlatList
          data={seat}
          keyExtractor={(item) => item.id.toString()}
          numColumns={5}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.seatcard,
                item.booked
                  ? styles.booked
                  : item.selected
                    ? styles.selected
                    : styles.available,
              ]}
              onPress={() => handlePress(item.id)}
            >
              <Text>{item.seatNO}</Text>
            </Pressable>
          )}
          ListFooterComponent={
            <View style={styles.summaryContainer}>
              <Text style={styles.heading}>Selected Seats</Text>

              <View style={styles.selectedSeatContainer}>
                {selectedSeats.length > 0 ? (
                  selectedSeats.map((item) => (
                    <View key={item.id} style={styles.selectedSeatChip}>
                      <Text style={styles.selectedSeatText}>{item.seatNO}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No seats selected</Text>
                )}
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Tickets</Text>
                <Text style={styles.value}>{selectedSeats.length}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Total</Text>
                <Text style={styles.value}>₹{selectedSeats.length * 250}</Text>
              </View>
              <Pressable style={styles.Bookbtn} onPress={handleBook}>
                <Text style={styles.btnText}>Book</Text>
              </Pressable>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default MovieSeat;
