import axios from "axios";
import { useEffect, useState } from "react";

import SongCard from "./components/SongCard";
import PaymentModal from "./components/PaymentModal";

function App() {
  
  // state to hold the list of songs fetched from the backend
  const [songs, setSongs] = useState([]);

  // state to hold the currently selected song for payment
  const [selectedSong, setSelectedSong] = useState(null);

  // state to hold the list of unlocked songs after successful payment
  const [unlockedSongs, setUnlockedSongs] = useState([]);

  // state to hold the currently selected song for payment
  const [currentSong, setCurrentSong] = useState(null);

  // fetch songs from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:8080/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  // function to open the payment modal and set the selected song
  const openPayment = async (song) => {

    try {

        const response = await axios.post(
          "http://localhost:8080/payment/create-order"
        );

        console.log(response.data); 

        // your existing popup logic here
        const order = response.data;

    const options = {
      key: "rzp_test_SsnqfbbQFrFTRm", // replace with your Razorpay key

      amount: order.amount,

      currency: order.currency,

      name: "Music Store",

      description: `Purchase ${song.title}`,

      order_id: order.id,

      // handler function to handle the payment success response
      handler: function (response) {

        console.log("Payment Success");

        console.log(response);
        
        alert("Payment Successful");
        console.log(song);

        setUnlockedSongs((prev) => [...prev, song.id]);
        setCurrentSong(song);

      },

      prefill: {
        name: "Sudheer",
        email: "test@example.com",
        contact: "9999999999",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

    } catch (error) {

        console.error(error);

    }
  };
  const playSong = (song) => {
    setCurrentSong(song);
  };

  // function to close the payment modal
  const closeModal = () => {
    setSelectedSong(null);
  };
  // console.log(songs)

  return (
    <div className="min-h-screen bg-black p-8">

      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Music Store
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            openPayment={openPayment}
            unlockedSongs={unlockedSongs}
            playSong={playSong}
          />
        ))}
      </div>

      <PaymentModal
        song={selectedSong}
        closeModal={closeModal}
      />
      {currentSong && (
        <div className="fixed bottom-0 left-0 w-full bg-black p-4">
            <p className="text-white mb-2">
              Now Playing: {currentSong.title}
            </p>

            <audio key={currentSong.id} controls autoPlay className="w-full">

              <source
                  src={currentSong.songUrl}
                  type="audio/mpeg"
              />

            </audio>

        </div>
      )}

    </div>
  );
}

export default App;