import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { fetchModel } from '../lrml/api';

function ClauseInput({ clause, setClause, setResponse }) {
    const [isChanged, setIsChanged] = useState(false);
    const handleChange = (event) => {
        if (clause != event.target.value) {
            setIsChanged(true);
            setClause(event.target.value);
        }
    };

    // Event listener for when user clicks off textinput
    const lrml = ''
    const handleOnBlur = async (event) => {
        // if input has changed, call api
        if (isChanged) {
            if (event.target.value === '') {
                setResponse('');
            } else {
                const res = await fetchModel(lrml, event.target.value);
                if (res) {
                    setResponse(res);
                }
            }
        }
        setIsChanged(false);
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "24rem",
            }}
        >
            <TextField
                fullWidth
                multiline
                label="Natural Clauses"
                rows={6}
                variant="filled"
                onChange={handleChange}
                onBlur={handleOnBlur}
                value={clause}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Box>
    )
}

export default ClauseInput;