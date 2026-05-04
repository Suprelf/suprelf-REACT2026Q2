import React, { Component } from "react";
import "./searchBar.css"

type Props = {
    onSearch: (value: string) => void;
}

type State = {
    inputValue: string
}

class SearchBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            inputValue: ""
        }
    }

    componentDidMount(): void {
        const savedValue = localStorage.getItem("last")
        if (savedValue) {
            this.setState({ inputValue: savedValue })
        }
    }

    handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        this.setState({ inputValue: value })
    }

    handleSearch = () => {
        const trimmed = this.state.inputValue.trim()

        if (!trimmed) return

        const currentLocalValue = localStorage.getItem("last") ?? ""

        if (trimmed === currentLocalValue) return

        localStorage.setItem("last", trimmed)
        this.props.onSearch(trimmed)
    };

    render() {
        return (
            <div className="main-container">
                <div className="search-container">

                    <input type="text" placeholder="Search here" className="search-input"
                        value={this.state.inputValue}
                        onChange={this.handleInput}>
                    </input>

                    <button onClick={this.handleSearch} className="search-button">Search</button>

                </div>
            </div>

        );
    }
}

export default SearchBar;