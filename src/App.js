import NavBar from './dummyComponents/navbar';
import React, { Component } from 'react';
import './App.css';
import Counters from './dummyComponents/counters';

class App extends Component {
    state = { 
        counters: [
            {id: 1, value: 3},
            {id: 2, value: 1},
            {id: 3, value: 2},
            {id: 4, value: 6},
            {id: 5, value: 10}
        ],
        lastCount: 5,
        modal: false,
        modalInput: 0
    };

    handleDelete = (id) => {
        this.setState({
            counters: this.state.counters.filter(counter => counter.id !== id)
        });
    };

    handleReset = () => {
        this.setState({
            counters: this.state.counters.map(counter => {
                counter.value = 0;
                return counter;
            })
        });
    };

    handleIncrement = id => {
        this.setState({
            counters: this.state.counters.map(counter => {
                if(id === counter.id) {
                    counter.value += 1;
                }

                return counter;
            })
        });
    };

    handleDecrement = id => {
        this.setState({
            counters: this.state.counters.map(counter => {
                if(id === counter.id && counter.value !== 0) {
                    counter.value -= 1;
                }

                return counter;
            })
        });
    };

    handleAddCounter = e => {
        this.setState({
            counters: this.state.counters.concat({
                id: this.state.lastCount + 1,
                value: this.state.modalInput
            }), 
            lastCount: this.state.lastCount + 1,
            modal: false
        });
    };

    handleChange = e => {
        console.log(e.target.value);
        this.setState({
            modalInput: parseInt(e.target.value)
        });
    };

    handleClose = () => {
        this.setState({
            modal: false
        });
    };

    openModal = () => {
        console.log('from openModal');
        this.setState({
            modal: true
        });
    }

    render() {
        return (
            <React.Fragment>
                <NavBar 
                    noOfCounters={this.state.counters.filter(counter => counter.value > 0).length} 
                />
                <main className="container">
                    <Counters 
                    onDelete={this.handleDelete} 
                    onIncrement={this.handleIncrement}
                    onDecrement={this.handleDecrement}
                    onReset={this.handleReset} 
                    counters={this.state.counters}
                    onAddCounter={this.handleAddCounter}
                    onOpenModal={this.openModal}
                    show={this.state.modal}
                    onClose={this.handleClose}
                    onChange={this.handleChange}
                    />
                </main>
            </React.Fragment>
        );
    }
}

export default App;
