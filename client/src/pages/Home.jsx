import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState(null); // 'solo' ou 'multi'
  const [customRoom, setCustomRoom] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (!username.trim() || !mode) return;
    const roomId =
      mode === 'solo'
        ? uuidv4().slice(0, 8)
        : customRoom.trim() || uuidv4().slice(0, 8);
    localStorage.setItem('username', username);
    localStorage.setItem('mode', mode);
    navigate(`/lobby/${roomId}/${username}`);
  };

  return (
    <div className="relative min-h-screen w-screen bg-black overflow-hidden font-gamer px-4 py-10">
      {/* Fond animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111] animate-pulse z-0" />
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/squares.png')]" />

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-red-500 drop-shadow-[0_0_20px_#ff0000] tracking-wider">
          ⬛ RED TETRIS ⬛
        </h1>

        {/* Pseudo */}
        <div className="flex flex-col items-center w-full max-w-lg max-w-[60%] gap-4">
          <label className="text-xl md:text-2xl text-red-300 font-semibold drop-shadow-[0_0_5px_#ff6666]">
            ➤ Entre ton pseudo :
          </label>
          <input
            type="text"
            placeholder="ex: tetrismaster42"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full max-w-md px-6 py-4 text-lg bg-black text-red-500 border-2 border-red-600 rounded-md focus:outline-none focus:ring-4 focus:ring-red-500/40 shadow-inner"
          />
        </div>

        {/* Choix du mode */}
        <div className="flex gap-6 flex-wrap justify-center">
          <button
            onClick={() => setMode('solo')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition duration-300 shadow-md shadow-red-500/30 ${
              mode === 'solo'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-red-400 hover:bg-red-700'
            }`}
          >
            🎮 Solo
          </button>
          <button
            onClick={() => setMode('multi')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition duration-300 shadow-md shadow-red-500/30 ${
              mode === 'multi'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-red-400 hover:bg-red-700'
            }`}
          >
            👾 Multi
          </button>
        </div>

        {/* Room ID custom en mode multi */}
        {mode === 'multi' && (
          <div className="flex flex-col items-center w-full max-w-lg gap-2">
            <label className="text-md text-gray-300">Code de salle (optionnel)</label>
            <input
              type="text"
              placeholder="ex: ma-room-123"
              value={customRoom}
              onChange={(e) => setCustomRoom(e.target.value)}
              className="w-full max-w-md px-6 py-3 text-md bg-black text-white border-2 border-red-600 rounded-md focus:outline-none focus:ring-4 focus:ring-red-500/30 shadow-inner"
            />
          </div>
        )}

        {/* Lancer partie */}
        <button
          onClick={handleStart}
          className={`mt-2 px-10 py-4 rounded-lg font-bold text-lg shadow-lg transition duration-300 ${
            username.trim() && mode
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
          disabled={!username.trim() || !mode}
        >
          ▶ Lancer la partie
        </button>

        <p className="text-gray-500 mt-10 text-sm md:text-base italic">
          Prêt à empiler des blocs et dominer le Tetris ? 🧱
        </p>
      </div>
    </div>
  );
}