import React from 'react';

class WireFrameCard extends React.Component {

    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-2 rounded grey lighten-4 todo-list-link hoverable">
                <div className="card-content grey-text text-darken-4 item_card">
                    <span className="card-title">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default WireFrameCard;