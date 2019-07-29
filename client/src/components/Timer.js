import React, { Component } from 'react';
import styled from 'styled-components';
import { Pad } from 'lib/Utility';

const MSEC = 1000;
const SEC =  MSEC * 60;
const MINUTE = SEC * 60;
const HOUR = MINUTE * 24;

const Content = styled.div`
    position: absolute;
    left: 15px;
    top: 15px;
`;

class Timer extends Component {    
    constructor(props) {
        super(props);

        this.timerID = null;

        this.state = {
            remainTime: 24 * 60 * 60 * 1000,
            hour: 24,
            minute: 0,
            second: 0 
        }
    };
    
    ElipsedTime = () => {
        const remainTime = this.state.remainTime - 1000;

        this.setState({
            remainTime: remainTime,
            hour: Math.floor((remainTime % HOUR) / MINUTE),
            minute: Math.floor((remainTime % MINUTE) / SEC),
            second: Math.floor((remainTime % SEC) / MSEC)
        });
    }

    componentDidMount() {
        this.timerID = setInterval(this.ElipsedTime, 1000);
    }    

    componentWillUnmount() {
        clearTimeout(this.timerID);
    }

    render() {
        const { hour, minute, second } = this.state;
        return (
            <Content>
                {Pad(hour, 2)}:{Pad(minute, 2)}:{Pad(second, 2)}
            </Content>
        );
    };
};

export default Timer;