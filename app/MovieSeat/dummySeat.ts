import Seat from "./MovieSeatType";

const rows = ["A", "B", "C", "D", "E"];

function dummySeat() {
  const seats: Seat[] = [];

  let id = 1;

  for (const row of rows) {
    for (let col = 1; col <= 5; col++) {
      const booked =
        (row === "B" && col === 4) ||
        (row === "D" && (col === 1 || col === 5)) ||
        (row === "E" && col === 3);

      const premium = row === "A" || (row === "E" && col === 5);

      seats.push({
        id: id,
        seatNO: `${row}${col}`,
        booked,
        selected: false,
        premium,
      });

      id++;
    }
  }

  return seats;
}

export default dummySeat;
