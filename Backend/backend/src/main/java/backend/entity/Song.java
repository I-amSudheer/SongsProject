package backend.entity;

import jakarta.persistence.*;

@Entity
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String movieName;

    private String songName;

    private String artist;

    private int price;

    private String songUrl;

    private String imageUrl;

    // Default constructor
    public Song() {
    }
    // Constructor with all fields except id (for creating new songs)
    public Song(Long id, String songName, String artist, int price, String songUrl, String imageUrl, String movieName) {
        this.id = id;
        this.movieName = movieName;
        this.songName = songName;
        this.artist = artist;
        this.price = price;
        this.songUrl = songUrl;
        this.imageUrl = imageUrl;
    }
   
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSongName() {
        return songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getSongUrl() {
        return songUrl;
    }

    public void setSongUrl(String songUrl) {
        this.songUrl = songUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }   

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public String getMovieName() {
        return movieName;
    }
    
    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }
}