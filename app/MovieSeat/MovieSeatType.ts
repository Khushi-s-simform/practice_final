interface seat {
  id: number;
  seatNO: string;
  booked: boolean;
  selected: boolean;
  premium?: boolean;
}

export default seat;
