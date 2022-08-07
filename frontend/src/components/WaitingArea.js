import {BallTriangle} from 'react-loader-spinner';

const WaitingArea = (props) => {
  if (props.status === 'waiting') {
    return <BallTriangle color="#de354c" height={80} width={80} />;
  } else if (props.status) {
    return (
      <h3 className="error-text">{props.status}</h3>
    );
  } else {
    return <div />;
  }
};

export default WaitingArea;
