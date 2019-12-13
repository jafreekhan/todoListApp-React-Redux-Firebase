import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Row, Col } from 'react-materialize';
import EditControls from './EditControls';
import { Rnd } from "react-rnd";

class ListScreen extends Component {
    state = {
        controls: [],
        field: "Null",
        fontSize: 0,
        backgroundColor: "Null",
        borderColor: "Null",
        borderThickeness: 0,
        borderRadius: 0,
    }

    sortCriteria = 'none';
    changedTime = false;


    handleController = (e) => {
        console.log("controller clicked")
        var len = this.state.controls.length;
        console.log(len)
        const newcontroller = {
            key: len,
            borderStyle: "solid",
            width: "100px",
            height: "100px",
            x: 0,
            y: 0,

            field: "Container",
            fontSize: 10,
            backgroundColor: "red",
            borderColor: "black",
            borderWidth: 4,
            borderRadius: 4,
        }
        this.setState({
            controls: [...this.state.controls, newcontroller],
            field: newcontroller.field,
            fontSize: newcontroller.fontSize,
            backgroundColor: newcontroller.backgroundColor,
            borderColor: newcontroller.borderColor,
            borderThickeness: newcontroller.borderWidth,
            borderRadius: newcontroller.borderRadius
        })
        console.log('this.state :', this.state);
    }

    handleChange = (e) => {
        e.preventDefault();
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        console.log(this.state)
        // const fireStore = getFirestore();
        // let dbitem = fireStore.collection('todoLists').doc(this.props.todoList.id);
        // dbitem.update({ [target.id]: target.value });
    }
    updateTime = () => {
        console.log("updating time")
        let fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({ time: Date.now() })
    }

    updateState = (newState) => {
        let newControls = this.state.controls.map((control) => {
            if (control.key === newState.key) {
                console.log({ ...control, ...newState });
                return { ...control, ...newState }
            } else {
                return control;
            }
        })
        console.log('this.state :', this.state);
        this.setState({
            controls: newControls
        })
    }

    render() {
        const auth = this.props.auth;
        let todoList = this.props.todoList;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if (!todoList)
            return <React.Fragment />

        if (!this.changedTime) {
            this.changedTime = true;
            this.updateTime();
        }

        return (
            <Row>
                <Col s={3}>
                    <div className="grey lighten-2 col">
                        <div style={{ border: "5px solid black", width: "120px", height: "50px", backgroundColor: "white" }} onClick={this.handleController}>
                            Add Container
                        </div>
                    </div>
                </Col>
                <Col s={6}>
                    <EditControls 
                        updateState={this.updateState}
                        controls={this.state.controls}
                    />
                </Col>

                <Col s={3}>
                    <div className="grey lighten-2 col">
                        <div className="wireframe properties">
                            <h4 className="grey-text text-darken-3 col s10">Properties</h4>
                            <div className="padding_20 col">
                                <div className="input-field col s6">
                                    <label className="active text_16" htmlFor="name">Field</label>
                                    <input className="text_20" type="text" name="field" id="field" onChange={this.handleChange} value={this.state.field} />
                                </div>
                                <div className="input-field col s6">
                                    <label className="active text_16" htmlFor="name">Font Size</label>
                                    <input className="text_20" type="text" name="fontSize" id="fontSize" onChange={this.handleChange} defaultValue={this.state.fontSize} />
                                </div>
                                <div className="input-field col s6">
                                    <label className="active text_16" htmlFor="name">Background:</label>
                                    <input className="text_20" type="text" name="backgroundColor" id="backgroundColor" onChange={this.handleChange} defaultValue={this.state.backgroundColor} />
                                </div>
                                <div className="input-field col s6">
                                    <label className="active text_16" htmlFor="name">Border Color:</label>
                                    <input className="text_20" type="text" name="borderColor" id="borderColor" onChange={this.handleChange} value={this.state.borderColor} />
                                </div>
                                <div className="input-field col s6">
                                    <label className="active text_16" htmlFor="name">Border Thickness:</label>
                                    <input className="text_20" type="text" name="borderThickeness" id="borderThickness" onChange={this.handleChange} value={this.state.borderThickeness} />
                                </div>
                                <div className="input-field col s6">
                                    <label className="active text_16" htmlFor="name">Border Radius:</label>
                                    <input className="text_20" type="text" name="borderRadius" id="borderRadius" onChange={this.handleChange} value={this.state.borderRadius} />
                                </div>
                            </div>
                        </div>
                    </div>
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