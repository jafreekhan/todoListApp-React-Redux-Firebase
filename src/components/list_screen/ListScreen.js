import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Row, Col } from 'react-materialize';
import EditControls from './EditControls';
import { Rnd } from "react-rnd";
import testJson from "./test.json"
import Properties from "./Properties"

class ListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            controls: testJson.controls,
            selected: -1,
            selectedControl: {}
        }
    }

    handleController = () => {
        let key = this.state.controls.length;
        const newcontroller = {
            key: key,
            type: "container",
            width: "100px",
            height: "100px",
            x: 100,
            y: 100,
            backgroundColor: "#00ff6a",
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 4,
            borderRadius: 4,
            color: "#000",
            fontSize: "12px"
        }

        this.setState({
            controls: [...this.state.controls, newcontroller]
        });
        console.log('this.state :', this.state);
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


    render() {
        const auth = this.props.auth;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <Row>
                <Col s={3}>
                    <div className="grey lighten-2">
                        <div className="add-container" onClick={this.handleController}>
                            Add Container
                        </div>
                    </div>
                </Col>
                <Col s={3}>
                    <Properties
                        updateState={this.updateState}
                        control={this.state.selectedControl}
                    />
                </Col>
                <Col s={6}>
                    <EditControls
                        updateState={this.updateState}
                        controls={this.state.controls}
                    />
                </Col>
            </Row>);
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    if (todoList)
        todoList.id = id;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ListScreen);



















// const SORT_BY_TASK_INCREASING = 'sort_by_task_increasing';
// const SORT_BY_TASK_DECREASING = 'sort_by_task_decreasing';
// const SORT_BY_DUE_DATE_INCREASING = 'sort_by_due_date_increasing';
// const SORT_BY_DUE_DATE_DECREASING = 'sort_by_due_date_decreasing';
// const SORT_BY_STATUS_INCREASING = 'sort_by_status_increasing';
// const SORT_BY_STATUS_DECREASING = 'sort_by_status_decreasing';

//     addItem = () => {
//         console.log("Adding a new item");
//         this.props.history.push({
//             pathname: this.props.todoList.id + "/item/" + this.props.todoList.items.length,
//         });
//     }

//     deleteList = () => {
//         let fireStore = getFirestore();
//         fireStore.collection('todoLists').doc(this.props.todoList.id).delete().then(function () {
//             console.log("Document successfully deleted!");
//         }).catch(function (error) {
//             console.error("Error removing document: ", error);
//         });

//         this.props.history.goBack();
//     }



// sortByDescription = () => {
//     if (this.sortCriteria !== SORT_BY_TASK_INCREASING)
//         this.sortCriteria = SORT_BY_TASK_INCREASING
//     else
//         this.sortCriteria = SORT_BY_TASK_DECREASING;
//     this.sortList(this.sortCriteria);
// }

// sortByDueDate = () => {
//     if (this.sortCriteria !== SORT_BY_DUE_DATE_INCREASING)
//         this.sortCriteria = SORT_BY_DUE_DATE_INCREASING;
//     else
//         this.sortCriteria = SORT_BY_DUE_DATE_DECREASING;
//     this.sortList(this.sortCriteria);
// }

// sortByCompleted = () => {
//     if (this.sortCriteria !== SORT_BY_STATUS_INCREASING)
//         this.sortCriteria = SORT_BY_STATUS_INCREASING;
//     else
//         this.sortCriteria = SORT_BY_STATUS_DECREASING;
//     this.sortList(this.sortCriteria);
// }

// sortList = (criteria) => {
//     console.log("Sorting by: ", this.sortCriteria);
//     let newItems = this.generateItemsInSortedOrder(criteria);
//     for (let i = 0; i < newItems.length; i++) {
//         newItems[i].key = i;
//         newItems[i].id = i;
//     }

//     let firestore = getFirestore();
//     firestore.collection("todoLists").doc(this.props.todoList.id).update({ items: newItems });
// }

// generateItemsInSortedOrder = (criteria) => {
//     let newItems = Object.assign([], this.props.todoList.items);
//     newItems.sort(function (a, b) {
//         if (criteria === SORT_BY_TASK_INCREASING)
//             return a.description.localeCompare(b.description);
//         else if (criteria === SORT_BY_TASK_DECREASING)
//             return b.description.localeCompare(a.description);
//         else if (criteria === SORT_BY_DUE_DATE_INCREASING)
//             return a.due_date.localeCompare(b.due_date);
//         else if (criteria === SORT_BY_DUE_DATE_DECREASING)
//             return b.due_date.localeCompare(a.due_date);
//         else if (criteria === SORT_BY_STATUS_INCREASING)
//             return ("" + a.completed).localeCompare("" + b.completed);
//         else
//             return ("" + b.completed).localeCompare("" + a.completed);
//     });
//     return newItems;
// }


// <div style={{ border: "10px solid black", width: "600px", height: "800px", backgroundColor: "white" }}>
//                         {this.state.controls.map((control) => {

//                             return (<Rnd
//                                 size={{ width: control.width, height: control.height }}
//                                 position={{ x: control.x, y: control.y }}
//                                 onDragStop={(e, d) => {
//                                     this.updateState({
//                                         key: control.key,
//                                         x: d.x,
//                                         y: d.y
//                                     })
//                                 }}

//                                 // onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
//                                 // onResizeStop={(e, direction, ref, delta, position) => {
//                                 //     this.setState({
//                                 //         width: ref.style.width,
//                                 //         height: ref.style.height,
//                                 //         ...position,
//                                 //     });
//                                 // }}
//                                 bounds="parent"
//                             >
//                                 <div style={control}>

//                                 </div>
//                             </Rnd>)
//                         })}

//                     </div>