import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Lobby() {
  const { roomId, username } = useParams();
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('join_room', { roomId, username });

    socket.on('room_update', (users) => {
      setPlayers(users);
    });

    socket.on('game_start', (payload) => {
        setGameStarted(true);
        console.log('Game starting with:', payload);

        // Redirection vers la page de jeu
        navigate(`/game/${roomId}/${username}`, { state: payload }); // on passe les infos
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (gameStarted) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold animate-pulse text-green-400">
          🚀 La partie démarre...
        </h1>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white p-6 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-red-500">🎮 Lobby</h1>
      <p className="text-gray-400">Room ID : <span className="text-white">{roomId}</span></p>
      <p className="text-gray-400">En attente de joueurs...</p>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">👤 Joueurs connectés :</h2>
        <ul className="list-disc ml-5 text-white">
          {players.map((player, i) => (
            <li key={i}>{player}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}