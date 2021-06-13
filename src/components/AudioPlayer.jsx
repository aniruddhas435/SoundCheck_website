import React, { Component } from 'react';

export class AudioPlayer extends Component {
    constructor(props) {
        super();
        this.audioContext = new window.AudioContext();
        this.oscillator = null;
        this.gainNode = null;
        this.gainDuration = 0.19;

        this.state = {
            playPause: 'play_arrow', // 'replay', 'pause'
            volumeIcon: 'volume_down', // 'volume_mute'
            audioSource: this.audioSource,
            volume: 20,
            audioCurrentTime: 0,
            currentIndex: 0
        };
    }

    stop = (gainDuration) => {
        console.log('from AudioPlayer.stop');
        if(gainDuration) {
            this.gainNode.gain.exponentialRampToValueAtTime(
                0.00001, this.audioContext.currentTime + gainDuration
            );
            this.oscillator.stop(
                this.audioContext.currentTime + gainDuration
            );
        } else {
            this.gainNode.gain.setValueAtTime(
                0.00001, this.audioContext.currentTime
            );
            this.oscillator.stop(
                this.audioContext.currentTime
            );
        }
    };

    onEnded = gainDuration => {
        console.log('ended');
        this.setState({
            playPause: 'replay',
            currentIndex: 0,
            audioCurrentTime: 100
        });
        this.props.setIsPlayerOn(false);
        this.stop(gainDuration);
    };

    togglePlayPause = event => {
        if(this.state.playPause === 'play_arrow' || this.state.playPause === 'replay') {
            this.setState({
                playPause: 'pause'
            });

            this.initSource();
            this.props.setIsPlayerOn(true);
            this.playNextNote();
        } else {
            this.setState({
                playPause: 'play_arrow'
            });
            this.stop(this.gainDuration);
            this.props.setIsPlayerOn(false);
        }
    };

    createPeriodicWave = () => {
        let real = new Float32Array(2);
        let imag = new Float32Array(2);

        real[0] = -1;
        real[1] = 1;
        imag[0] = 0;
        imag[1] = 0;

        return this.audioContext.createPeriodicWave(real, imag);
    };

    initSource = () => {
        this.audioContext.resume();
        this.oscillator = this.audioContext.createOscillator();
        this.gainNode = this.audioContext.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        this.oscillator.setPeriodicWave(this.createPeriodicWave());
        this.oscillator.start();
    };

    playNextNote = () => {
        if(this.props.selected === 'scaledSyntax' || this.props.isLoading) {
            this.stop();
            return;
        }
        if(this.state.currentIndex === this.props.frequencies.length) {
            this.onEnded();
        } else {
            this.playNote(
                this.props.frequencies[this.state.currentIndex], 0.01
            );
        }
    };

    playNote = (frequency, gainDuration) => {
        this.oscillator.frequency.value = frequency;
        this.oscillator.frequency.exponentialRampToValueAtTime(
            frequency, this.audioContext.currentTime + gainDuration
        );

        const currentTime = this.state.currentIndex / this.props.frequencies.length * 100 + 1;
        setTimeout(() => {
            if(this.state.playPause === 'pause') {
                this.setState({
                    currentIndex: this.state.currentIndex + 1,
                    audioCurrentTime: parseInt(currentTime.toFixed(2))
                });
                this.playNextNote();
            }
        }, this.props.duration);
    };

    onVolumeChange = value => {
        this.setState({
            volume: value
        });
        this.gainNode.gain.value = value;
    };

    toggleVolume = event => {
        console.log('from toggleVolume');
        if(this.state.volumeIcon === 'volume_down') {
            this.setState({
                volumeIcon: 'volume_mute',
            });
        } else {
            this.setState({
                volumeIcon: 'volume_down',
            });
        }
    };

    onSeek = event => {
        let enteredValue = event.target.value;
        const arraySize = this.props.frequencies.length;

        let index = enteredValue / 100 * arraySize;
        index = parseInt(index.toFixed());

        enteredValue = index / arraySize * 100;
        enteredValue = parseInt(enteredValue.toFixed(2));
        this.setState({
            audioCurrentTime: enteredValue,
            currentIndex: index
        });
    };

    render() {
        return (
            <div className='audio-player'>
                <div className="notes"></div>
                <div className="controls">
                    <button className="play" 
                    onClick={e => this.togglePlayPause(e)}>
                        <span className="material-icons">
                            {this.state.playPause}
                        </span>
                    </button>

                    <input type="range" 
                    className="seekbar" value={this.state.audioCurrentTime}
                    onChange={event => this.onSeek(event)} />

                    <span className="material-icons volume-icon" 
                    onClick={e => this.toggleVolume(e)}>
                        {this.state.volumeIcon}
                    </span>

                    <input type="range" 
                    className="volume" value={this.state.volume}
                    onChange={event => this.onVolumeChange(event.target.value)}/>
                </div>
            </div>
        );
    }
}

export default AudioPlayer;