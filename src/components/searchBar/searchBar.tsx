import React, { Component } from "react";
import "./searchBar.css"

type Props = {
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
        const trimmed = (this.state.inputValue).trim()
        const currentLocalValue = localStorage.getItem("last") ?? ""

        if (trimmed !== currentLocalValue && trimmed !== "") {
            localStorage.setItem("last", trimmed);
        }

    }

    render() {
        return (
            <div>
                <div>

                    <input type="text" placeholder="Search here"
                        value={this.state.inputValue}
                        onChange={this.handleInput}>
                    </input>

                    <button onClick={this.handleSearch}>Search</button>

                </div>
            </div>

        );
    }
}

export default SearchBar;