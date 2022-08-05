import {Button} from "react-bootstrap";

const Navigation = () => {
    return (
        <div className="Navigation">
            <div className="Navigation-Content">
                <a
                    href="#"
                    className="Navigation-Link"
                >
                    smlr.org
                </a>
                <div>
                    <Button
                        className="btn-light"
                    >
                        URL shortener
                    </Button>
                    <Button
                        className="btn-light"
                    >
                        API documentation
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
