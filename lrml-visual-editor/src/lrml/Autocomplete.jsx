import { useState } from 'react';
import {
    Box,
    Button,
} from "@mui/material";

function Autocomplete() {
    const TEXT = 'The floor waste shall have a minimum diameter of 40 mm.';
    const LRML = "if {";
    const BASE_URL = "http://127.0.0.1:5000";
    const HEADERS = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    }

    const [response, setResponse] = useState("");

    async function fetchModel() {
        const BODY = new URLSearchParams({
            text: TEXT,
            lrml: LRML,
        });

        fetch(BASE_URL + '/api/predict', {
            method: "POST",
            body: BODY,
            headers: HEADERS,
        }).then((res) => {
            console.log(res.json());
        });
    }

    return (
        <Box>
            <Button variant="contained" onClick={() => fetchModel()}>
                AUTOCOMPLETE
            </Button>
        </Box>
    )
};

export default Autocomplete;
