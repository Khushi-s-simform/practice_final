import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dummySeat from "./dummySeat";
import styles from "./MovieSeatStyle";

const MovieSeat = () => {
  const [seat, setSeat] = useState(dummySeat);

  const selectedSeats = useMemo(
    () => seat.filter((item) => item.selected),
    [seat],
  );

  const groupedSeats = useMemo(() => {
    const rows = ["A", "B", "C", "D"];

    return rows.map((row) => ({
      rowName: row,
      seats: seat.filter((item) => item.seatNO.startsWith(row)),
    }));
  }, [seat]);

  const handlePress = (id: number) => {
    const selectedCount = seat.filter((item) => item.selected).length;
    const clickedSeat = seat.find((item) => item.id === id);

    if (!clickedSeat || clickedSeat.booked) return;

    if (!clickedSeat.selected && selectedCount >= 6) {
      Alert.alert(
        "Seat limit reached",
        "You can book up to 6 seats per transaction.",
      );
      return;
    }

    setSeat((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const handleBook = () => {
    if (selectedSeats.length === 0) {
      Alert.alert("No seats selected", "Pick at least one seat to continue.");
      return;
    }

    setSeat((prev) =>
      prev.map((item) =>
        item.selected ? { ...item, booked: true, selected: false } : item,
      ),
    );

    Alert.alert(
      "Booking confirmed",
      `You booked ${selectedSeats.length} seats for tonight's show.`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.heroTextBlock}>
              <Text style={styles.badge}>Now Showing</Text>
              <Text style={styles.movieTitle}>Midnight Skyline</Text>
              <Text style={styles.movieSubtitle}>IMAX • 4K • Dolby Atmos</Text>
            </View>
            <View style={styles.pricePill}>
              <Text style={styles.priceText}>₹250</Text>
            </View>
          </View>

          <View style={styles.heroStats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>2D</Text>
              <Text style={styles.statLabel}>Format</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>8:30 PM</Text>
              <Text style={styles.statLabel}>Showtime</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>A12</Text>
              <Text style={styles.statLabel}>Hall</Text>
            </View>
          </View>
        </View>

        <View style={styles.theaterSection}>
          <Text style={styles.sectionTitle}>Choose your seats</Text>

          <View style={styles.screenPreview}>
            <View style={styles.screenGlow} />
            <Text style={styles.screenLabel}>SCREEN</Text>
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.availableSeat]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.selectedSeat]} />
              <Text style={styles.legendText}>Selected</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.bookedSeat]} />
              <Text style={styles.legendText}>Booked</Text>
            </View>
          </View>

          <View style={styles.seatMap}>
            {groupedSeats.map(({ rowName, seats }) => (
              <View key={rowName} style={styles.row}>
                <Text style={styles.rowLabel}>{rowName}</Text>
                <View style={styles.rowSeats}>
                  {seats.map((item) => (
                    <Pressable
                      key={item.id}
                      style={[
                        styles.seatButton,
                        item.booked
                          ? styles.bookedSeat
                          : item.selected
                            ? styles.selectedSeat
                            : item.premium
                              ? styles.premiumSeat
                              : styles.availableSeat,
                      ]}
                      onPress={() => handlePress(item.id)}
                    >
                      <Text
                        style={[
                          styles.seatButtonText,
                          item.booked || item.selected
                            ? styles.seatButtonTextSelected
                            : null,
                        ]}
                      >
                        {item.seatNO}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Your selection</Text>
            <Text style={styles.summarySubtitle}>
              {selectedSeats.length} tickets
            </Text>
          </View>

          <View style={styles.selectedSeatsWrap}>
            {selectedSeats.length > 0 ? (
              selectedSeats.map((item) => (
                <View key={item.id} style={styles.selectedChip}>
                  <Text style={styles.selectedChipText}>{item.seatNO}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>
                Tap a seat to build your booking.
              </Text>
            )}
          </View>

          <View style={styles.summaryInfoRow}>
            <Text style={styles.label}>Ticket price</Text>
            <Text style={styles.value}>₹{selectedSeats.length * 250}</Text>
          </View>

          <View style={styles.summaryInfoRow}>
            <Text style={styles.label}>Service fee</Text>
            <Text style={styles.value}>₹{selectedSeats.length ? 40 : 0}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryInfoRow}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.value}>
              ₹{selectedSeats.length ? selectedSeats.length * 250 + 40 : 0}
            </Text>
          </View>

          <Pressable style={styles.bookButton} onPress={handleBook}>
            <Text style={styles.bookButtonText}>Continue to payment</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieSeat;
