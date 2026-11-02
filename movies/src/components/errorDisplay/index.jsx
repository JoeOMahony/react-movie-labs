import React from "react";
import { Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

const ErrorDisplay = (props) => {
    const resource = props.resource ? `There was an error when handling your ${props.resource} request!` : "There was an error when handling your fetch request";
    const message = props.message ? props.message : "Unknown error";
    return (
        <div align="center">
            <ErrorIcon sx={{ typography: 'errorIconFont' }} />
            <Typography variant="h5" component="h3" sx={{ typography: 'pageErrorHeadFont' }}>
                {resource}
            </Typography>
            <Typography variant="h5" component="p" sx={{ typography: 'pageErrorBodyFont' }}>
                <br />The following error message was returned:
            </Typography>
            <Typography variant="h6" component="p" sx={{ typography: 'pageErrorCodeFont' }}>
                <code>{message}</code>
            </Typography>
        </div>
    );
};

export default ErrorDisplay;