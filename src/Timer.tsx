import * as React from "react";
import './Timer.css';

type Props = {
    startTimeInSeconds: number;
}

type State = {
    timeRemainingInSeconds: number;
}

export default class Timer extends React.Component<Props, State> {
    private timer: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            timeRemainingInSeconds: props.startTimeInSeconds
        };
    }

    decrementTimeRemaining = () => {
        if (this.state.timeRemainingInSeconds > 0) {
            this.setState({
                timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
            });
        } else {
            clearInterval(this.timer!);
        }
    };

    componentDidMount() {
        this.timer = setInterval(() => {
            this.decrementTimeRemaining();
        }, 1000);
    }

    render() {
        return (
            <div className="countdown-timer">
                <button className="btn btn-primary">Hola</button>
                <div className="countdown-timer__circle">
                    <svg>
                        <circle
                            r="24"
                            cx="26"
                            cy="26"
                            style={{
                                animation: `countdown-animation ${this.props
                                    .startTimeInSeconds}s linear`
                            }}
                        />
                    </svg>
                </div>
                <div className="countdown-timer__text">
                    {this.state.timeRemainingInSeconds}s
                </div>
            </div>
        );
    }
}