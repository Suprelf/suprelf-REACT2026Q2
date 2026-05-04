import React, { Component } from "react";
import "./itemTable.css"

type Props = {}

type State = {}

class ItemTable extends Component<Props, State> {
    render() {
        return (
            <div className="table-container">

                <div className="table-item">
                    <div className="item-name table-header">Name</div>
                    <div className="item-desc table-header">Description</div>
                </div>
                <hr className="hr-header" />

                <div className="table-item">
                    <div className="item-name">name</div>
                    <div className="item-desc">description</div>
                </div>
                <hr className="hr-item" />
                <div className="table-item">
                    <div className="item-name">name</div>
                    <div className="item-desc">description</div>
                </div>
                <hr className="hr-item" />
                <div className="table-item">
                    <div className="item-name">name</div>
                    <div className="item-desc">description</div>
                </div>
                <hr className="hr-item" />

            </div>
        );
    }
}

export default ItemTable;