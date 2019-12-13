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
                        <div style={control}>

                        </div>
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



                        // onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                        // onResizeStop={(e, direction, ref, delta, position) => {
                        //     this.setState({
                        //         width: ref.style.width,
                        //         height: ref.style.height,
                        //         ...position,
                        //     });
                        // }}