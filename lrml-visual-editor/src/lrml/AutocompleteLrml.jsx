import { useState } from 'react';
import {
    Box,
    Button,
} from "@mui/material";

function Autocomplete({ currentClause }) {
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
            text: currentClause,
            lrml: LRML,
        });

        await fetch(BASE_URL + '/api/predict', {
            method: "POST",
            body: BODY,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }).then((res) => {
            res.json().then((data) => {
                console.log(data);
                return data;
            }).catch((err) => {
                console.log(err);
            })
        })
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
