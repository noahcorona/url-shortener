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
                    <button
                        className="Navigation-Button"
                    >
                        API documentation
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
