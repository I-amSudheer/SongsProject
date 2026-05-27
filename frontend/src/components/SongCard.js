
// SongCard.js
export default function SongCard({
  song,
  openPayment,
  unlockedSongs,
  playSong  
}) {
  const isUnlocked = unlockedSongs.includes(song.id);
 
  
  return (
    // Card container with hover effect
    <div className="bg-gray-900 text-white rounded-2xl p-4 shadow-lg hover:scale-105 transition duration-300">
      <img
        src={song.imageUrl}
        alt={song.name}
        className="w-full h-56 object-cover rounded-xl"
      />

      <div className="mt-4">     
        <h2 className="text-xl font-bold">
          {song.songName}
        </h2>
        
        <p className="text-gray-400">
          {song.artist}
        </p>

        <p className="mt-2 text-green-400 font-semibold">
          ₹ {song.price}
        </p>

        <button
             onClick={() => {

      if (isUnlocked) {

         playSong(song);

      } else {

         openPayment(song);

      }
   }}
          className="bg-green-500 w-full py-3 rounded-xl text-white font-bold"
          // className="mt-4 w-full bg-green-500 hover:bg-green-600 py-2 rounded-xl font-semibold"
        >
           {isUnlocked ? "Play Song" : "Listen Now"}
        </button>

      </div>
    </div>
  );
}