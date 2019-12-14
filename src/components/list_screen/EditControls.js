import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rnd } from "react-rnd";

class EditControls extends Component {

    render() {

        return (
            <div style={{ border: "10px solid black", width: "600px", height: "800px", backgroundColor: "white" }}>
                {this.props.controls.map((control) => {

                    console.log('control :', control);
                    let node;
                    switch (control.type) {
                        case "container":
                            node = <div style={control} />
                        case "button":
                            node = <button style={control}> {control.text} </button>
                        case "label":
                            node = <div style={control}> {control.text} </div>
                        case "textfield":
                        default:

                    };

                    return (<Rnd
                        size={{ width: control.width, height: control.height }}
                        position={{ x: control.x, y: control.y }}
                        onDragStop={(e, d) => {
                            this.props.updateState({
                                key: control.key,
                                x: d.x,
                                y: d.y
                            })
                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            this.props.updateState({
                                key: control.key,
                                width: ref.style.width,
                                height: ref.style.height,
                                ...position,
                            });
                        }}
                        key={control.key}
                        bounds="parent"
                    >
                        {node}
                    </Rnd>)
                })}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(EditControls);
