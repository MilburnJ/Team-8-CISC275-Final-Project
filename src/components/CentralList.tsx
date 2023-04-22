import React from "react";
import movieList from "../data/movieList.json";
import { Movie } from "../interfaces/movie";
import { useState } from "react";

export function CentralList(): JSX.Element {
    const [movies] = useState<Movie[]>(
        movieList.map((movie) => {
            return {
                image: movie.image,
                title: movie.name,
                description: movie.desc,
                maturity_rating: movie.age,
                cast: movie.cast,
                genre: movie.genre
            };
        })
    );

    // internal component state for testing/getting it working
    const [userMovies, setUserMovies] = useState<Movie[]>([]);

    function handleOnDrag(e: React.DragEvent, widgetType: Movie) {
        e.dataTransfer.setData("widgetType", JSON.stringify(widgetType));
    }

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = JSON.parse(
            e.dataTransfer.getData("widgetType")
        ) as Movie;
        console.log("widgetType", widgetType);
        setUserMovies([...userMovies, widgetType]);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    // function handleOnDrag(e: React.DragEvent, widgetType: Movie) {
    //     e.dataTransfer.setData("widgetType", widgetType);
    // }

    // function handleOnDrop(e: React.DragEvent){
    //     const widgetType = e.dataTransfer.getData("widgetType") as Movie:
    //     console.log("widgetType", widgetType);
    //     setWidgets([...userMovies], widgetType);
    // }

    // function handleDragOver(e: React.DragEvent) {
    //     e.preventDefault();
    // }

    // const [, drag] = useDrag(() => ({
    //     type: "movie",
    //     collect: (monitor) => ({
    //         isDragging: !!monitor.isDragging()
    //     })
    // }));

    // const [draggedMovie, setDraggedMovie] = useState<Movie | null>(null);
    // const [, drag] = useDrag<DraggedMovieItem, void, { isDragging: boolean }>({
    //     item: { type: "movie", payload: null },
    //     collect: (monitor: DragSourceMonitor) => ({
    //         isDragging: !!monitor.isDragging()
    //     })
    // });

    // const handleMouseDown = (movie: Movie) => {
    //     setDraggedMovie(movie);
    // };

    return (
        <div>
            <h1> Drag Movies Here </h1>
            <div
                className="col"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
                {userMovies.map((movie) => (
                    <div className="droppedMovie" key={movie.title}>
                        <img src={movie.image} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <div>
                            <p>{movie.description}</p>
                            <p>Genre: {movie.genre.join(", ")}</p>
                            <p>Age Rating: {movie.maturity_rating}</p>
                            <p>Cast: {movie.cast.join(", ")}</p>
                        </div>{" "}
                    </div>
                ))}
            </div>

            <h1>Central Movie List</h1>
            <div className="col">
                {movies.map((movie) => (
                    <div key={movie.title}>
                        <div
                            draggable
                            onDragStart={(e) => handleOnDrag(e, movie)}
                        >
                            <img src={movie.image} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <div>
                                <p>{movie.description}</p>
                                <p>Genre: {movie.genre.join(", ")}</p>
                                <p>Age Rating: {movie.maturity_rating}</p>
                                <p>Cast: {movie.cast.join(", ")}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
