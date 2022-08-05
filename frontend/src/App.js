import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import ResponseArea from "./components/ResponseArea";
import URLInputArea from "./components/URLInputArea";
import Navigation from "./components/navigation/Navigation";
import DocModal from "./components/DocModal";

function App() {
    const [modalShowing, setModalShowing] = useState(false);
    const [lastInput, setLastInput] = useState(null);
    const [lastResponse, setLastResponse] = useState(null);

    useEffect(() => {
        if(lastInput) {
            setLastResponse(lastInput);
            console.log(lastInput);
        }
    }, [lastInput]);

    return (
        <div className="App">
            <div className="Content">
                <div className="Content-Body">
                    <DocModal
                        show={modalShowing}
                        handleClose={() => setModalShowing(false)}
                    />
                    <Navigation onDocClick={(e) => {
                        e.preventDefault();
                        setModalShowing(true)
                    }} />
                    <URLInputArea setLastInput={setLastInput} />
                    {lastResponse &&
                        <ResponseArea
                            copyText={"test"}
                            originalURL={"https://test.com/"}
                            lifespan={"Forever"}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
