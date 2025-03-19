import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Song {
  id: string;
  title: string;
  url: string;
}

const MyMusic: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's songs (replace with actual API call)
    setSongs([
      { id: '1', title: 'Uploaded Song 1', url: '/a.mp3' },
      { id: '2', title: 'Favorited Song 1', url: '/a.mp3' },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Music</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => (
          <Card key={song.id} className="p-4 shadow-lg">
            <CardTitle>{song.title}</CardTitle>
            <CardContent>
              <audio controls className="w-full mt-2">
                <source src={song.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <Button
                className="mt-4 w-full"
                onClick={() => navigate(`/songs/${song.id}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyMusic;
