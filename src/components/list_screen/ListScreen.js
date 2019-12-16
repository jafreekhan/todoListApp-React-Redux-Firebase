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
        console.log('wireframe from list screen', this.props.wireframe)
        this.state = {
            name: "",
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
            console.log('data.data().controls', data.data().controls)
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
        // console.log('id', id)
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
                    text: "button",
                    textalign: "center"
                }
                break;
            case "label":
                newcontroller = {
                    key: key,
                    type: "label",
                    width: 80,
                    height: 40,
                    x: 0,
                    y: 0,
                    backgroundColor: "",
                    borderColor: "#dce775",
                    borderStyle: "",
                    borderWidth: 0,
                    borderRadius: 0,
                    color: '#ba68c8',
                    fontSize: "18px",
                    text: "Label",
                    textalign: "center"
                }
                break;
            case "textfield":
                newcontroller = {
                    key: key,
                    type: "textfield",
                    width: 100,
                    height: 40,
                    x: 0,
                    y: 0,
                    backgroundColor: "#dce775",
                    borderColor: "#dce775",
                    borderStyle: "solid",
                    borderWidth: 4,
                    borderRadius: 10,
                    color: '#ba68c8',
                    fontSize: "12px",
                    text: "textfield",
                    textalign: "center"
                }
                break;
            default:
                return;
        }

        this.setState({
            controls: [...this.state.controls, newcontroller]
        });
        // console.log('this.state :', this.state);
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

    saveWork = () => {
        const id = this.props.id
        const wire = this.props.wireframe
        // console.log('id from listscreen', id)
        const newControl = this.state.controls
        const fireStore = getFirestore();
        fireStore.collection('wireframes').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.id === id) {
                    fireStore.collection('wireframes').doc(id).set({
                        name: wire.name,
                        height: wire.height,
                        width: wire.height,
                        controls: newControl,
                        time: Date.now()
                    })
                }
            })
        });
    }
    closeWork = () => {
        this.props.history.push({
            pathname: "/"
        });
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
        const wire = this.props.wireframe

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        const actions = <div> <Button className="green" onClick={() => this.saveWork()} modal="close"> Yes </Button> <Button className="green" modal="close">No</Button></div>
        const closeAction = <div> <Button className="green" onClick={() => this.closeWork()} modal="close"> Yes </Button> <Button className="green" modal="close">No</Button></div>

        return (
            <Row>
                <Col s={3} className={"brown lighten-3"}>
                    <Row>
                        <Col s={6}>
                            <i class="large material-icons" onClick={() => this.handleZoom(true)}>zoom_in</i>
                        </Col>
                        <Col s={6}>
                            <i class="large material-icons" onClick={() => this.handleZoom(false)}>zoom_out</i>
                        </Col>
                        <Col s={6}>
                            {/* <i class="small" onClick={() => this.saveWork()}>Save</i> */}
                            <Modal id={"save"} actions={actions} header="Save?" trigger={<Button class="small" onClick={() => this.saveWork()} >Save</Button>}>
                                <p>
                                    Are you sure you want to Save the list?
                                </p>
                            </Modal>
                        </Col>
                        <Col s={6}>
                            {/* <i class="small" onClick={() => this.closeWork()}>Close</i> */}
                            <Modal id={"close"} actions={closeAction} header="Close?" trigger={<Button class="small" onClick={() => this.closeWork()} >Close</Button>}>
                                <p>
                                    Are you sure you want to close the wireframe?
                                </p>
                            </Modal>
                        </Col>

                        <Col s={12}>
                            <TextInput
                                defaultValue={"yerr"}
                                label="Name"
                                onChange={e => this.setState({ wireframeStyle: { ...this.state.wireframeStyle, width: e.target.value } })}
                            />
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
                            <div id="label" className="add-label" onClick={(e) => this.handleController(e.target.id)}>
                                Label
                            </div>
                        </Col>

                        <Col s={6}>
                            <div id="button" className="add-button" onClick={(e) => this.handleController(e.target.id)}>
                                Button
                            </div>
                        </Col>
                        <Col s={6}>
                            <div id="textfield" className="add-textfield" onClick={(e) => this.handleController(e.target.id)}>
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
        id,
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

