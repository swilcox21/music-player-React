import React from "react";

export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			songs: [],
			currentSong: 0
		};
		this.player = null;
	}
	// onload this function below will execute
	componentDidMount() {
		this.pauseBtn.style.display = "none";
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(resp => resp.json())
			.then(songs => this.setState({ songs }));
	}

	play(index) {
		const url = this.state.songs[index].url;
		if (url)
			this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
		// update the player from null to play
		this.player.play();
		// make the play button disappear
		this.playBtn.style.display = "none";
		// make the pause button display
		this.pauseBtn.style.display = "inline-block";
		// set the current state to the current song that the user has chosen
		this.setState({ currentSong: index });
	}
	pause() {
		this.player.pause();
		// make the pause button disappear
		this.pauseBtn.style.display = "none";
		// make the play button display
		this.playBtn.style.display = "inline-block";
	}

	render() {
		return (
			<div className="container col-4">
				<h2>Sams Jams</h2>
				<ol>
					{this.state.songs.map((song, index) => {
						return (
							<li
								className={
									this.state.currentSong == index
										? "song active"
										: "song"
								}
								onClick={() => this.play(index)}
								key={index}>
								{song.name}
							</li>
						);
					})}
				</ol>
				<section className="text-center myButtons mx-3">
					<button
						onClick={() => this.play(this.state.currentSong - 1)}>
						<i className="fas fa-caret-square-left" />
					</button>
					{/* PLAY BUTTON  */}
					<button
						ref={ele => (this.playBtn = ele)}
						onClick={() => this.play(this.state.currentSong)}>
						<i className="fas fa-play" />
					</button>
					{/* PAUSE BUTTON  */}
					<button
						ref={ele => (this.pauseBtn = ele)}
						onClick={() => this.pause()}>
						<i className="fas fa-pause-circle" />
					</button>
					<button
						onClick={() => this.play(this.state.currentSong + 1)}>
						<i className="fas fa-caret-square-right" />
					</button>
				</section>
				<audio ref={player => (this.player = player)} />
			</div>
		);
	}
}
