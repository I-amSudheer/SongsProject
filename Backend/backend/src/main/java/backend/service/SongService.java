package backend.service;

import backend.entity.Song;
import backend.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {

    // injecting the SongRepository to interact with the database
    @Autowired
    private SongRepository songRepository;

    // fetching the song details
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    // adding a new song to the database
    public Song addSong(Song song) {
        return songRepository.save(song);
    }
}