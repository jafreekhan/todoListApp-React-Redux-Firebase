import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireFrameLinks from './WireFrameLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    handleNewList = () => {
        let newListData = {
            name: 'Unnamed',
            controls: [],
            width: 600,
            height: 600,
            time: Date.now(),
        }
        const fireStore = getFirestore();
        let newList = fireStore.collection("wireframes").doc();
        newList.set(newListData);

        this.props.history.push({
            pathname: "wireframes/" + newList.id,
            key: newList.id,
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="z-depth-2" style={{
                backgroundColor: "#55435f", paddingBottom: '70px', borderRadius: '0 0 10px 10px',
                backgroundImage: 'linear-gradient(to bottom, #7F5A95, #473850)'
            }}>
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m4">
                            <WireFrameLinks />
                        </div>

                        <div className="col s8">
                            <div className="banner">
                                Wireframer<sup>TM</sup><br />
                                <br/>
                                <br/>
                        </div>

                            <div style={{ paddingTop: '15px' }} className="home_new_list_container center-align">
                                {/* {<button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>} */}
                                <a onClick={this.handleNewList} className="waves-effect waves-light btn-large red accent-2 hoverable rounded">
                                    <i className="material-icons right">library_add</i>Create New Wireframe
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframes', orderBy: ["time", "desc"] },
    ]),
)(HomeScreen);