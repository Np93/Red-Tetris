import { useParams, useLocation } from 'react-router-dom';

export default function Game() {
  const { roomId, username } = useParams();
  const { state } = useLocation(); // récupère payload depuis navigate
  const isSolo = state?.solo;

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">🧱 RED TETRIS</h1>
      <p className="mb-2">Room ID : {roomId}</p>
      <p className="mb-2">Joueur : {username}</p>
      <p className="mb-2">{isSolo ? "Mode solo" : "Mode multijoueur"}</p>

      {/* Ici viendra le plateau Tetris */}
      <div className="mt-8 bg-gray-800 w-[10rem] h-[20rem] border-4 border-red-500">
        {/* Plateau temporaire */}
      </div>
    </div>
  );
}