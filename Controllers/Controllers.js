const Room = [
  {
    id: 1,
    roomName: "Deluxe",
    numberOfSeats: 8,
    amenities: "Smart TV,Fridge with Drinks,AC",
    pricePerHour: 150,
    RoomId: 1,
  },
];

const Bookings = [
  {
    id: 1,
    customerName: "George David",
    date: "26/05/2024",
    startTime: "10:00 AM",
    endTime: "10:00 PM",
    RoomId: 1,
    status: "booked",
  },
];

const BookedDetails = [
  {
    id: 1,
    customerName: "George David",
    date: "26/05/2024",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    RoomId: 1,
    status: "booked",
    roomName: "Deluxe",
  },
];

export const rooms = (req, res) => {
  try {
    res.status(200).json({ message: "Rooms", data: Room });
  } catch (err) {
    res
      .status(200)
      .json({ message: "error in fetching Room details", data: err });
  }
};
export const createRoom = (req, res) => {
  const { roomName, numberOfSeats, amenities, pricePerHour, RoomId } = req.body;
  const roomExists = Room.filter((e) => e.id == RoomId);
  if (roomExists.length === 0) {
    const createdRoom = {
      id: Room.length + 1,
      roomName: roomName,
      numberOfSeats: numberOfSeats,
      amenities: amenities,
      pricePerHour: pricePerHour,
      RoomId: RoomId,
    };
    Room.push(createdRoom);
    res.status(200).json({ message: "new room created", room: createdRoom });
  } else {
    res.status(404).json({ message: "room already exists" });
  }
};

export const bookRoom = (req, res) => {
  try {
    const { customerName, date, startTime, endTime, RoomId } = req.body;
    const roomExists = Room.filter((e) => e.RoomId == RoomId);

    if (roomExists.length === 0) {
      res.status(400).json({ message: "No Room in this ID" });
    }

    function isTimeRangeOverlap(start1, end1, start2, end2) {
      return start1 < end2 && start2 < end1;
    }

    function hours(timeString) {
      const [time, period] = timeString.split(" ");
      const [hour, minute] = time.split(":");
      let formattedHour = parseInt(hour);

      if (period === "PM") {
        formattedHour += 12;
      }

      return `${formattedHour}:${minute}`;
    }

    const isBookingConflict = (newBooking, existingBookings) => {
      return existingBookings.some(
        (booking) =>
          booking.RoomId === newBooking.RoomId &&
          booking.date === newBooking.date &&
          isTimeRangeOverlap(
            hours(booking.startTime),
            hours(booking.endTime),
            hours(newBooking.startTime),
            hours(newBooking.endTime)
          )
      );
    };

    const addBooking = (newBooking, existingBookings) => {
      if (!isBookingConflict(newBooking, existingBookings)) {
        existingBookings.push(newBooking);
        const RoomName = Room.find((e) => e.RoomId == newBooking.RoomId);
        BookedDetails.push({ ...newBooking, roomName: RoomName.roomName });
        res.status(200).json({
          message: "room Booked1",
          data: newBooking,
        });
        console.log("Booking added successfully.");
      } else {
        res.status(404).json({
          message:
            "The room is already booked at the specified date and time range.",
        });
        console.log(
          "Error: The room is already booked at the specified date and time range."
        );
      }
    };
    const bookedData = {
      id: Bookings.length + 1,
      customerName: customerName,
      date: date,
      startTime: startTime,
      endTime: endTime,
      RoomId: RoomId,
      status: "booked",
    };
    addBooking(bookedData, Bookings);
  } catch (err) {
    res.status(400).json({ message: "error", error: err });
  }
};

export const getBookings = (req, res) => {
  try {
    res.status(200).json({ message: Bookings });
  } catch (err) {
    res.status(404).json({ message: "error in booking data", error: err });
  }
};

export const getBookedRooms = (req, res) => {
  const bookedDetails = [];
  try {
    bookedDetails.push(
      BookedDetails.map((e) => {
        return {
          RoomName: e.roomName,
          BookedStatus: e.status,
          CustomerName: e.customerName,
          date: e.date,
          StartTime: e.startTime,
          EndTime: e.endTime,
        };
      })
    );

    res
      .status(200)
      .json({ message: "Booked Rooms data", data: bookedDetails[0] });
  } catch (err) {
    res.status(404).json({ message: "error in showing data", error: err });
  }
};

export const getCustomers = (req, res) => {
  const customerDetails = [];

  try {
    customerDetails.push(
      BookedDetails.map((e) => {
        return {
          CustomerName: e.customerName,
          RoomName: e.roomName,
          date: e.date,
          StartTime: e.startTime,
          EndTime: e.endTime,
        };
      })
    );

    res
      .status(200)
      .json({ message: "Data of Customers", data: customerDetails[0] });
  } catch (err) {
    res.status(404).json({ message: "error in getting data", error: err });
  }
};

export const timesBooked = (req, res) => {
  const customer = req.params.name;
  const customerBooked = BookedDetails.filter(
    (e) => e.customerName === customer
  );
  const timesBooked = [];
  try {
    timesBooked.push(
      customerBooked.map((e) => {
        return {
          CustomerName: e.customerName,
          RoomName: e.roomName,
          date: e.date,
          StartTime: e.startTime,
          EndTime: e.endTime,
          BookingId: e.id,
          Status: e.status,
        };
      })
    );

    res
      .status(200)
      .json({ message: `Bookings of ${customer}`, data: timesBooked[0] });
  } catch (err) {
    res.status(404).json({ message: "error in getting data", error: err });
  }
};
