import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function ClauseInput({ clause, setClause }) {
    const handleChange = (event) => {
        setClause(event.target.value)
        console.log(event.target.value);
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
                value={clause}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Box>
    )
}

export default ClauseInput;