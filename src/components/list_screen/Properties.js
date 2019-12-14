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
                        <span className="label"> Background Color</span>

                        < CirclePicker
                            color={control.backgroundColor}
                            colors={['#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']}
                            onChangeComplete={(color) => this.updateState("backgroundColor", color.hex)}
                        />
                    </Col>

                    <Col s={12}>
                        <span className="label"> Border Color</span>

                        < CirclePicker
                            color={control.borderColor}
                            colors={['#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']}
                            onChangeComplete={(color) => this.updateState("borderColor", color.hex)}
                        />
                    </Col>
                    <Col s={6}>
                        <TextInput
                            value={control.borderWidth}
                            label="Border Width"
                            onChange={e => this.updateState("borderWidth", e.target.value)}
                        />
                    </Col>
                    <Col s={6}>
                        <TextInput
                            value={control.borderRadius}
                            label="Border Radius"
                            onChange={e => this.updateState("borderRadius", e.target.value)}
                        />
                    </Col>

                    <Col s={6}>
                        <TextInput
                            value={control.fontSize}
                            label="Font Size"
                            onChange={e => this.updateState("fontSize", e.target.value)}
                        />
                    </Col>
                    <Col s={6}>
                        <TextInput
                            value={control.text}
                            label="Text"
                            onChange={e => this.updateState("text", e.target.value)}
                        />
                    </Col>

                    <Col s={12}>
                        <span className="label"> Font Color</span>

                        < CirclePicker
                            color={control.backgroundColor}
                            colors={['#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']}
                            onChangeComplete={(color) => this.updateState("color", color.hex)}
                        />
                    </Col>


                </Row>
            </div>

        )
    }
}

export default Properties
