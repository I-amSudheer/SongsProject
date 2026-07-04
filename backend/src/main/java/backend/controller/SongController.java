package backend.controller;

import backend.entity.Song;
import backend.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/songs")
@CrossOrigin(origins = "https://songs-project-kappa.vercel.app")
public class SongController {

    @Autowired 
    private SongService songService;
    
    // fetching the song details 
    @GetMapping
    public List<Song> getAllSongs() {
        return songService.getAllSongs();
    }

    // adding a new song to the database
    @PostMapping
    public Song addSong(@RequestBody Song song) {
        return songService.addSong(song);
    }
}