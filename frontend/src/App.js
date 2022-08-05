import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import ResponseArea from "./components/ResponseArea";
import URLInputArea from "./components/URLInputArea";
import Navigation from "./components/Navigation";

function App() {
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
                <Navigation />
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
    );
}

export default App;
