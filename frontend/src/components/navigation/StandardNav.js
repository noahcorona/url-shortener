import {FaGithub} from "react-icons/fa";
import {SiBuymeacoffee} from "react-icons/si";

const StandardNav = ({onDocClick}) => {
    return (
        <div className="Navigation">
            <div className="Navigation-Content">
                <div>
                    <a
                        href="frontend/src/components/navigation/Navigation#StandardNav.js"
                        className="Navigation-Link"
                    >
                        smlr
                    </a>
                    <p>Sometimes, smaller is better</p>
                </div>
                <div className="Navigation-Button-Area">
                    <a
                        className="Navigation-Button"
                        href="frontend/src/components/navigation/Navigation#StandardNav.js"
                        onClick={onDocClick}
                    >
                        API
                    </a>
                    <a
                        className="Navigation-Button-Icon"
                        href="https://github.com/noahcorona/url-shortener"
                    >
                        <FaGithub />
                    </a>
                    <a
                        className="Navigation-Button-Icon"
                        href="https://buymeacoffee.com/4IeSH91kr"
                    >
                        <SiBuymeacoffee />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default StandardNav;
