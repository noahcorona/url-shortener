import { BrowserView, MobileView } from 'react-device-detect';
import StandardNav from "./StandardNav";
import HamburgerNav from "./HamburgerNav"
import {useEffect, useState} from "react";

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    console.log(window);
    return {innerWidth, innerHeight};
}

const Navigation = ({onDocClick}) => {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <>
            <BrowserView>
                {windowSize.innerWidth <= 600 ?
                    <HamburgerNav isOnBottom={false} onDocClick={onDocClick}/> :
                    <StandardNav onDocClick={onDocClick}/>
                }
            </BrowserView>
            <MobileView>
                <HamburgerNav isOnBottom={true} onDocClick={onDocClick} />
            </MobileView>
        </>
    )
}

export default Navigation;
