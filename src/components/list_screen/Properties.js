import React, { Component } from 'react';
import { Row, Col, TextInput } from "react-materialize";
import { CirclePicker } from "react-color";

class Properties extends Component {

    updateState = (field, value) => {
        console.log([field], value);
        this.props.updateState({ key: this.props.control.key, [field]: value });
    }



    render() {
        console.log('this.props :', this.props);
        const { control } = this.props;
        console.log('control :', control);
        if (!control)
            return (<div />)

        return (
            <div className="wireframe properties">
                <Row>
                    <Col s={12}>
                        < CirclePicker
                            color={control.backgroundColor}
                            onChangeComplete={(color) => this.updateState("backgroundColor", color.hex)}
                        />
                    </Col>

                    <Col s={12}>
                        < CirclePicker
                            color={control.borderColor}
                            onChangeComplete={(color) => this.updateState("borderColor", color.hex)}
                        />
                    </Col>
                    <Col s={6}>
                        <TextInput
                            label="Border Width"
                            onChange={e => this.updateState("borderWidth", e.target.value)}
                        />
                    </Col>
                    <Col s={6}>
                        <TextInput
                            label="Border Radius"
                            onChange={e => this.updateState("borderRAdius", e.target.value)}
                        />
                    </Col>
                </Row>
            </div>

        )
    }
}

export default Properties
