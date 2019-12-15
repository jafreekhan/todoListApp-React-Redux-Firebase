import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rnd } from "react-rnd";

class EditControls extends Component {

    render() {
        return (
            <div className="edit-controls" style={this.props.style} onClick={this.props.unselect} >
                {
                    this.props.controls.map((control) => {

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
                                node = <div style={control}> {control.text} </div>
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
                            onClick={e => e.stopPropagation()}
                            bounds="parent"
                        >
                            {node}
                        </Rnd>)
                    })
                }

            </ div>
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
