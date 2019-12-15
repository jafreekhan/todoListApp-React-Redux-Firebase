import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Row, Col, TextInput } from 'react-materialize';
import EditControls from './EditControls';
import { Rnd } from "react-rnd";
import testJson from "./test.json"
import Properties from "./Properties"

class ListScreen extends Component {

    constructor(props) {
        super(props);
        console.log('this.props', this.props)
        // console.log('wireframe', wireframe)
        this.state = {
            controls: [],
            wireframeStyle: {
                width: testJson.wireframes[0].width,
                height: testJson.wireframes[0].height
            },
            selectedControl: {}
        }
        console.log(testJson.wireframes[0].width, testJson.wireframes[0].height)
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
        console.log('mounting')
        const { id } = this.props.match.params;
        const firestore = getFirestore();

        firestore.collection("wireframes").doc(id).get().then((data) => {
            this.setState({
                controls: data.data().controls
            })
        })
    }
    componentWillUnmount = () => {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        console.log('event.keyCode', event.keyCode)
        if (event.ctrlKey && event.keyCode === 68) {
            console.log('duplicate')
            this.handleDuplicate();
        }
        if (event.keyCode === 46) {
            this.handleDelete();

        }
    }

    handleDuplicate = () => {
        let key = this.getHighKey();
        const { controls, selectedControl } = this.state;
        const duplicateControl = Object.assign({}, selectedControl, { key, x: selectedControl.x + 100, y: selectedControl.y + 100 });
        this.setState({
            controls: [...controls, duplicateControl]
        })
    }

    handleDelete = () => {
        this.setState({
            controls: this.state.controls.filter((c) => c.key !== this.state.selectedControl.key)
        })
    }

    getHighKey = () => {
        let highKey = 0;
        this.state.controls.forEach((arrayElement) => {
            if (arrayElement.key > highKey)
                highKey = arrayElement.key;
        });
        highKey++;
        return highKey;
    }


    handleController = (id) => {
        let key = this.getHighKey();
        console.log('id', id)
        let newcontroller;
        switch (id) {
            case "container":
                newcontroller = {
                    key: key,
                    type: "container",
                    width: "100px",
                    height: "100px",
                    x: 0,
                    y: 0,
                    backgroundColor: "#00ff6a",
                    borderColor: "#dce775",
                    borderStyle: "solid",
                    borderWidth: 4,
                    borderRadius: 4,
                    color: "#000",
                    fontSize: "12px",
                    text: "container"
                }
                break;
            case "button":
                newcontroller = {
                    key: key,
                    type: "button",
                    width: 80,
                    height: 40,
                    x: 0,
                    y: 0,
                    backgroundColor: "#555555",
                    borderColor: "#dce775",
                    borderStyle: "solid",
                    borderWidth: 4,
                    borderRadius: 10,
                    color: '#ba68c8',
                    fontSize: "12px",
                    text: "button"
                }
                break;
            case "label":
            case "textfield":
            default:
                return;
        }

        this.setState({
            controls: [...this.state.controls, newcontroller]
        });
        console.log('this.state :', this.state);
    }

    unselect = () => {
        this.setState({
            selectedControl: {}
        })
    }

    updateState = (newState) => {
        const controls = this.state.controls.map((control) => {
            if (control.key === newState.key) {
                return { ...control, ...newState }
            } else {
                return control;
            }
        })
        let selectedControl = this.getSelectedElement(controls, newState.key);
        // console.log('selectedControl :', selectedControl);
        this.setState({
            selectedControl,
            selected: newState.key,
            controls
        })
        console.log('state :', this.state);
    }

    getSelectedElement = (controls, key) => {
        if (key === -1)
            return {}
        console.log(controls.filter((c) => c.key === key).pop());
        return controls.filter((c) => c.key === key)[0];
    }

    handleZoom = (zoomIn) => {
        const { width, height } = this.state.wireframeStyle;
        if (zoomIn) {
            this.setState({
                wireframeStyle: {
                    width: width * 1.3,
                    height: height * 1.3
                }
            });
        }
        else {
            this.setState({
                wireframeStyle: {
                    width: width * .7,
                    height: height * .7
                }
            });
        }
    }

    render() {
        const auth = this.props.auth;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <Row>
                <Col s={3}>
                    <Row>
                        <Col s={6}>
                            <i class="large material-icons" onClick={() => this.handleZoom(true)}>zoom_in</i>
                        </Col>
                        <Col s={6}>
                            <i class="large material-icons" onClick={() => this.handleZoom(false)}>zoom_out</i>
                        </Col>

                        <Col s={6}>
                            <TextInput
                                defaultValue={this.state.wireframeStyle.width}
                                label="Width"
                                onChange={e => this.setState({ wireframeStyle: { ...this.state.wireframeStyle, width: e.target.value } })}
                            />
                        </Col>
                        <Col s={6}>
                            <TextInput
                                defaultValue={this.state.wireframeStyle.height}
                                label="Height"
                                onChange={e => this.setState({ wireframeStyle: { ...this.state.wireframeStyle, height: e.target.value } })}
                            />
                        </Col>

                        <Col s={6}>
                            <div id="container" className="add-container" onClick={(e) => this.handleController(e.target.id)}>
                                Container
                            </div>
                        </Col>
                        <Col s={6}>
                            <div id="label" className="add-container" onClick={(e) => this.handleController(e.target.id)}>
                                Label
                            </div>
                        </Col>

                        <Col s={6}>
                            <div id="button" className="add-container" onClick={(e) => this.handleController(e.target.id)}>
                                Button
                            </div>
                        </Col>
                        <Col s={6}>
                            <div id="textfield" className="add-container" onClick={(e) => this.handleController(e.target.id)}>
                                Textfield
                            </div>
                        </Col>

                    </Row>

                </Col>
                <Col s={6}>
                    <EditControls
                        style={this.state.wireframeStyle}
                        updateState={this.updateState}
                        controls={this.state.controls}
                        unselect={this.unselect}
                    />
                </Col>
                <Col s={3}>
                    <Properties
                        updateState={this.updateState}
                        control={this.state.selectedControl}
                    />
                </Col>
            </Row>);
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { wireframes } = state.firestore.data;
    const wireframe = wireframes ? wireframes[id] : null;
    // if (todoList)
    //     todoList.id = id;
    console.log('wireframe', wireframe)
    return {
        wireframe,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframes' },
    ]),
)(ListScreen);

