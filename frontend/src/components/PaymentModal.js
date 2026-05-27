import { QRCodeCanvas } from "qrcode.react";

export default function PaymentModal({
  song,
  closeModal,
}) {
  
  if (!song) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">

      <div className="bg-gray-900 text-white p-6 rounded-2xl w-96 relative">

        <button
          onClick={closeModal}
          className="absolute top-2 right-4 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Payment
        </h2>

        <img
          src={song.imageUrl}
          alt={song.name}
          className="w-full h-52 object-cover rounded-xl"
        />

        <h3 className="text-xl mt-4 font-semibold">
          {song.name}
        </h3>

        <p className="text-gray-400">
          {song.artist}
        </p>

        <p className="mt-3 text-green-400 text-lg font-bold">
          Amount: ₹ {song.price}
        </p>
        
        {/* It displays QR code */}
        <div className="bg-white p-4 rounded-xl">
          <QRCodeCanvas
            value={`upi://pay?pa=9440663168@ibl&pn=MusicStore&am=${song.price}&cu=INR`}
            size={250}
          />
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Scan and complete payment
        </p>

      </div>
    </div>
  );
}