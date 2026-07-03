import { useEffect, useState } from "react";
import axios from "axios";
import SongCard from "../components/SongCard";
import { useNavigate } from "react-router-dom";

function Home() {

    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const navigate = useNavigate();

    const playSong = (song) => {
        setCurrentSong(song);
    };

    // logout navigation

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    const token = localStorage.getItem("token");
    useEffect(() => {


        axios.get("https://songsproject.onrender.com/songs", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setSongs(res.data);
        })
        .catch((err) => {
            console.log(err);

            // Token expired or invalid
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem("token");
                window.location.href = "/";
            }
        });

    }, [token]);

    return (
        <div className="min-h-screen bg-black p-8">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold text-white">
                    Music Store
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                    Logout
                </button>

            </div>

            <h1 className="text-4xl font-bold text-white text-center mb-8">
                Music Store
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {songs.map((song) => (
                    <SongCard
                        key={song.id}
                        song={song}
                        playSong={playSong}
                    />
                ))}

            </div>

            {currentSong && (

                <div className="fixed bottom-0 left-0 w-full bg-black p-4">

                    <p className="text-white mb-2">
                        Now Playing: {currentSong.title}
                    </p>

                    <audio
                        key={currentSong.id}
                        controls
                        autoPlay
                        className="w-full"
                    >
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

export default Home;