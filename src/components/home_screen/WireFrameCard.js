import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class WireFrameCard extends React.Component {

    deleteList = (e) => {
        e.preventDefault();
        const id = this.props.wireframe.id
        console.log('id', id)
        const fireStore = getFirestore();
        fireStore.collection('wireframes').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.id === id){
                    fireStore.collection('wireframes').doc(doc.id).delete();
                }
            })
        });
    }

    render() {
        const { wireframe } = this.props;
        return (
            <div className="card z-depth-2 rounded grey lighten-4 todo-list-link hoverable">
                <div className="card-content grey-text text-darken-4 item_card">
                    <span className="card-title">{wireframe.name}</span>
                    <a class="btn-floating btn-medium waves-effect waves-light red"><i class="material-icons" onClick={this.deleteList}>delete</i></a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    return {
        id,
        // wireframe,
        // auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframes' },
    ]),
)(WireFrameCard);