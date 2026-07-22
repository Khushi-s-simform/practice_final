import Seat from "./MovieSeatType";

const rows = ["A", "B", "C", "D"];

function dummySeat() {
  const seats: Seat[] = [];

  let id = 1;

  for (const row of rows) {
    for (let col = 1; col <= 5; col++) {
      seats.push({
        id: id,
        seatNO: `${row}${col}`,
        booked: false,
        selected: false,
      });

      id++;
    }
  }

  return seats;
}

export default dummySeat;
